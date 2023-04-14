import { accounts, users } from "@nw/db";
import { createId } from "@paralleldrive/cuid2";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import type { InferModel } from "drizzle-orm";
import { eq, or } from "drizzle-orm/expressions";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type NewUser = InferModel<typeof users, "insert">;

export const authRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
                userName: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { email, userName, password } = input;

            try {
                const existingUser = await ctx.db
                    .select()
                    .from(users)
                    .where(
                        or(eq(users.email, email), eq(users.name, userName))
                    );

                if (existingUser.length > 0) {
                    throw new TRPCError({
                        code: "BAD_REQUEST"
                    });
                }

                // TODO: check if email or userName is already in use
                const hash = await bcrypt.hash(password, 10);

                const newUser: NewUser = {
                    id: createId(),
                    email,
                    name: userName,
                    emailVerified: null,
                    image: null,
                    password: hash
                };

                await ctx.db.transaction(async (tx) => {
                    await tx.insert(users).values(newUser);
                    await tx.insert(accounts).values({
                        id: createId(),
                        userId: newUser.id,
                        type: "credentials",
                        provider: "credentials",
                        providerAccountId: newUser.id
                    });
                });
            } catch (error) {
                console.log(error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    cause: error
                });
            }
        })
});
