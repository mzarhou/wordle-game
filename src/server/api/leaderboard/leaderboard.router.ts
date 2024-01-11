import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/trpc";

export const leaderboardRouter = createTRPCRouter({
  byScore: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().positive().optional(),
          offset: z.number().positive().optional(),
        })
        .optional(),
    )
    .query(({ ctx: { db }, input }) => {
      return db.query.users.findMany({
        columns: { id: false },
        orderBy: (users, { desc }) => [desc(users.score)],
        limit: input?.limit,
        offset: input?.offset,
      });
    }),
});
