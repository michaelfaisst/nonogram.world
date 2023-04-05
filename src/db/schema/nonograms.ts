import type { InferModel } from "drizzle-orm";
import {
    boolean,
    integer,
    json,
    pgEnum,
    pgTable,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

import { users } from "./auth";

export const nonogramTypeEnum = pgEnum("nonogram_type", ["black_and_white"]);

export const nonograms = pgTable("nonograms", {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    title: varchar("name", { length: 191 }).notNull(),
    type: nonogramTypeEnum("type").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
    solution: boolean("solution").array().notNull(),
    rowClues: json("row_clues").notNull(),
    colClues: json("col_clues").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    createdBy: varchar("created_by", { length: 191 })
        .notNull()
        .references(() => users.id)
});

export type Nonogram = InferModel<typeof nonograms>;
