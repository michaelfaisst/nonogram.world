import type { NextApiRequest, NextApiResponse } from "next";
import { db, users } from "@nw/db";
import env from "@nw/env";
import { eq } from "drizzle-orm/expressions";
import { verify } from "jsonwebtoken";

export const confirmAccount = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { token } = req.query;

    if (!token || Array.isArray(token)) {
        return res.status(400).json({ error: "Bad request" });
    }

    try {
        const { userId } = verify(token, env.EMAIL_SECRET) as {
            userId: string;
        };

        const userList = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));

        if (userList[0] === undefined) {
            return res
                .status(400)
                .json({ error: "User defined in token doesn't exist" });
        }

        const user = userList[0];

        await db
            .update(users)
            .set({ emailVerified: new Date() })
            .where(eq(users.id, user.id));

        return res.redirect("/auth/account-confirmed");
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
