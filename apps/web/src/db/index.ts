import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { env } from "~/env.mjs";

const connection = connect({
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD
});

export const db = drizzle(connection);
