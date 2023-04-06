import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm/expressions";
import { z } from "zod";
import { nonograms } from "~/db/schema";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const nonogramRouter = createTRPCRouter({
    getNonograms: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                offset: z.number().min(0).nullish()
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(nonograms)
                .limit(input.limit ?? 10)
                .offset(input.offset ?? 0);
        }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const nonogram = await ctx.db
                .select()
                .from(nonograms)
                .where(eq(nonograms.id, input.id))
                .limit(1);

            if (!nonogram || nonogram.length === 0) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return nonogram[0];
        })
});
