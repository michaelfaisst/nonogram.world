import env from "@nw/env";
import { connect, type Config } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const config: Config = {
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD
};

const connection = connect(config);
export const db = drizzle(connection);
