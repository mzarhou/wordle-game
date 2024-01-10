import { createTRPCRouter, protectedProcedure } from "../trpc";
import { wordValidator } from "~/lib/validators/game.validator";

export const gameRouter = createTRPCRouter({
  generateWord: protectedProcedure.mutation(({ ctx }) => {
    console.log({ userId: ctx.auth.userId });
  }),

  submitWord: protectedProcedure.input(wordValidator).mutation(({ input }) => {
    if (input.word !== "stone") {
      throw new Error("Invalid Word");
    }
  }),
});
