import { randomUUID } from "crypto";
import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse
} from "next";
import { db, users } from "@nw/db";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import { eq } from "drizzle-orm/expressions";
import NextAuth, {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions
} from "next-auth";
import { decode, encode } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";

import { DrizzleAdapter } from "./drizzleAdapter";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

const drizzleAdapter = DrizzleAdapter(db);

// Info:
// This shit needs to be so complicated to be able to use credentials with a database strategy
// because the guys from next-auth simply don't want people to use credentials and can't
// be bothered to just implemented some nicer workflow for this
//
// followed the following guide for this crap:
// https://branche.online/next-auth-credentials-provider-with-the-database-session-strategy/
const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                // session.user.role = user.role; <-- put other properties on the session here
            }
            return session;
        }
    },
    adapter: drizzleAdapter,
    pages: {
        signIn: "/auth/sign-in"
    },
    providers: [
        DiscordProvider({
            id: "discord",
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email"
                },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // TODO: better error handling for invalid credentials, account not activated, etc.
                if (!credentials) {
                    return null;
                }

                try {
                    const userList = await db
                        .select()
                        .from(users)
                        .where(eq(users.email, credentials.email));

                    if (userList[0] === undefined) {
                        throw new Error();
                    }

                    const user = userList[0];

                    const passwordValid = await bcrypt.compare(
                        credentials.password,
                        user.password || ""
                    );

                    if (!passwordValid) {
                        throw new Error();
                    }

                    return { ...user, password: undefined };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }
        })
    ]
};

const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000);
};

export async function auth(req: NextApiRequest, res: NextApiResponse) {
    authOptions.callbacks = {
        ...authOptions.callbacks,
        signIn: async ({ user }) => {
            if (
                req.query.nextauth?.includes("callback") &&
                req.query.nextauth?.includes("credentials") &&
                req.method === "POST"
            ) {
                if (user) {
                    const sessionToken = randomUUID();
                    const sessionExpiry = fromDate(60 * 60 * 24 * 7); // 7 days

                    await drizzleAdapter.createSession({
                        sessionToken,
                        userId: user.id,
                        expires: sessionExpiry
                    });

                    const cookies = new Cookies(req, res);

                    cookies.set("next-auth.session-token", sessionToken, {
                        expires: sessionExpiry
                    });
                }
            }

            return true;
        }
    };

    authOptions.jwt = {
        ...authOptions.jwt,
        encode: async ({ secret, token, maxAge }) => {
            if (
                req.query.nextauth?.includes("callback") &&
                req.query.nextauth?.includes("credentials") &&
                req.method === "POST"
            ) {
                const cookies = new Cookies(req, res);
                const cookie = cookies.get("next-auth.session-token");

                if (cookie) {
                    return cookie;
                } else {
                    return "";
                }
            }

            return encode({ token, secret, maxAge });
        },
        decode: async ({ secret, token }) => {
            if (
                req.query.nextauth?.includes("callback") &&
                req.query.nextauth?.includes("credentials") &&
                req.method === "POST"
            ) {
                return null;
            }

            return decode({ token, secret });
        }
    };

    return await NextAuth(req, res, authOptions);
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
