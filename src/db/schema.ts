import type { InferModel } from "drizzle-orm";
import {
    index,
    int,
    json,
    mysqlEnum,
    mysqlTable,
    text,
    timestamp,
    uniqueIndex,
    varchar
} from "drizzle-orm/mysql-core";

export const accounts = mysqlTable(
    "accounts",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        userId: varchar("userId", { length: 191 }).notNull(),
        type: varchar("type", { length: 191 }).notNull(),
        provider: varchar("provider", { length: 191 }).notNull(),
        providerAccountId: varchar("providerAccountId", {
            length: 191
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: int("expires_at"),
        token_type: varchar("token_type", { length: 191 }),
        scope: varchar("scope", { length: 191 }),
        id_token: text("id_token"),
        session_state: text("session_state")
    },
    (account) => ({
        userIdIndex: index("accounts__userId__idx").on(account.userId)
    })
);

export const sessions = mysqlTable(
    "sessions",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
        userId: varchar("userId", { length: 191 }).notNull(),
        expires: timestamp("expires").notNull()
    },
    (session) => ({
        sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
            session.sessionToken
        ),
        userIdIndex: index("sessions__userId__idx").on(session.userId)
    })
);

export const users = mysqlTable(
    "users",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        name: varchar("name", { length: 191 }),
        email: varchar("email", { length: 191 }).notNull(),
        emailVerified: timestamp("emailVerified"),
        image: varchar("image", { length: 191 }),
        password: varchar("password", { length: 191 })
    },
    (user) => ({
        emailIndex: uniqueIndex("users__email__idx").on(user.email)
    })
);

export const verificationTokens = mysqlTable(
    "verificationTokens",
    {
        identifier: varchar("identifier", { length: 191 })
            .primaryKey()
            .notNull(),
        token: varchar("token", { length: 191 }).notNull(),
        expires: timestamp("expires").notNull()
    },
    (verificationToken) => ({
        tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
            verificationToken.token
        )
    })
);

export const nonograms = mysqlTable(
    "nonograms",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        title: varchar("name", { length: 191 }).notNull(),
        type: mysqlEnum("nonogram_type", ["black_and_white"]).notNull(),
        width: int("width").notNull(),
        height: int("height").notNull(),
        solution: json("solution").$type<boolean[]>().notNull(),
        rowClues: json("row_clues").$type<number[][]>().notNull(),
        colClues: json("col_clues").$type<number[][]>().notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        createdBy: varchar("created_by", { length: 191 }).notNull()
    },
    (nonogram) => ({
        createdByIndex: index("nonograms__created_by__idx").on(
            nonogram.createdBy
        )
    })
);

export type Nonogram = InferModel<typeof nonograms>;
