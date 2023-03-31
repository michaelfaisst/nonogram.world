import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const nonogramRouter = createTRPCRouter({
    getNonograms: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish()
            })
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const items = await ctx.prisma.nonogram.findMany({
                take: limit + 1,
                cursor: cursor ? { id: cursor } : undefined,
                orderBy: {
                    id: "asc"
                }
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                const nextItem = items.pop();
                nextCursor = nextItem!.id;
            }

            return {
                nonograms: items,
                nextCursor
            };
        }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const nonogram = await ctx.prisma.nonogram.findUnique({
                where: { id: input.id }
            });

            if (!nonogram) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return nonogram;
        })
});
