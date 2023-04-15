import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter, createTRPCContext } from "@nw/api";
import cors from "nextjs-cors";
import { createOpenApiNextHandler } from "trpc-openapi";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Setup CORS
    await cors(req, res);

    // Handle incoming OpenAPI requests
    return createOpenApiNextHandler({
        router: appRouter,
        createContext: createTRPCContext
    })(req, res);
};

export default handler;
