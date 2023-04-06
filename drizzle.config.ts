import "dotenv/config";
import { Config } from "drizzle-kit";

const config: Config = {
    schema: "./src/db/schema.ts",
    out: "./migrations",
    connectionString:
        'mysql://ukz76xyisiglhyytjxgf:pscale_pw_cHo3HS9vqtYQMsc1kOumApMb4J7RPhCYYrFBhkv99uM@aws.connect.psdb.cloud/nonogram-world?ssl={"rejectUnauthorized":true}'
};

export default config;
