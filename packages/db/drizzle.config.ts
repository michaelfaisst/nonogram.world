import "dotenv/config";
import env from "@nw/env";
import type { Config } from "drizzle-kit";

const config: Config = {
    schema: "./src/schema.ts",
    out: "./migrations",
    connectionString: env.DB_URL
};

export default config;
