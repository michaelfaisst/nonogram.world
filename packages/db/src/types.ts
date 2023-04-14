import type { InferModel } from "drizzle-orm";

import type { nonograms } from "./schema";

export type DbNonogram = InferModel<typeof nonograms>;
