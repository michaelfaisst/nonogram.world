import { appRouter, createTRPCContext } from "@nw/api";
import env from "@nw/env";
import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
export default createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
        env.NODE_ENV === "development"
            ? ({ path, error }) => {
                  console.error(
                      `❌ tRPC failed on ${path ?? "<no-path>"}: ${
                          error.message
                      }`
                  );
              }
            : undefined
});
