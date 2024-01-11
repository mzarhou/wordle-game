import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/trpc";
import { getGameState } from "./game.storage";

export const protectedCurrentGameProcedure = protectedProcedure.use(
  async ({ next, ctx }) => {
    const gameState = await getGameState(ctx.userId);
    if (!gameState) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Game Not Found" });
    }

    if (gameState.state.end) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Game End" });
    }

    return next({ ctx: { gameState } });
  },
);
