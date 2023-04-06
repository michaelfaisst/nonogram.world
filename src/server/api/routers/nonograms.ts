import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm/expressions";
import { z } from "zod";
import { nonograms, users } from "~/db/schema";
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
            const result = await ctx.db
                .select({
                    id: nonograms.id,
                    title: nonograms.title,
                    width: nonograms.width,
                    height: nonograms.height,
                    createdBy: {
                        id: users.id,
                        name: users.name
                    }
                })
                .from(nonograms)
                .leftJoin(users, eq(nonograms.createdBy, users.id))
                .limit(input.limit ?? 10)
                .offset(input.offset ?? 0);

            return result;
        }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const nonogramList = await ctx.db
                .select()
                .from(nonograms)
                .where(eq(nonograms.id, input.id))
                .limit(1);

            if (!nonogramList || nonogramList.length === 0) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            return nonogramList[0]!;
        })
});
