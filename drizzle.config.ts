import { Config } from "drizzle-kit";

const config: Config = {
    schema: "./src/db/schema",
    connectionString: process.env.DATABASE_URL,
    out: "./src/db/migrations"
};

export default config;
