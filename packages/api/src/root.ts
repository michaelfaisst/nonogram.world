import { authRouter } from "./routers/auth";
import { nonogramRouter } from "./routers/nonograms";
import { seedRouter } from "./routers/seed";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    auth: authRouter,
    nonogram: nonogramRouter,
    seed: seedRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
