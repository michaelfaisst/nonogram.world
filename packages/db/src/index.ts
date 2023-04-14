import { connect, type Config } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

const config: Config = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const connection = connect(config);
export const db = drizzle(connection);
