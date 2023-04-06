import "dotenv/config";
import type { Config } from "drizzle-kit";

const config: Config = {
    schema: "./src/db/schema.ts",
    out: "./migrations",
    connectionString: process.env.DB_URL
};

export default config;
