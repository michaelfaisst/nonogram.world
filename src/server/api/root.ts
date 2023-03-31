import { createTRPCRouter } from "~/server/api/trpc";

import { nonogramRouter } from "./routers/nonograms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    nonogram: nonogramRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
