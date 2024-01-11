import { gameRouter } from "./api/game/game.router";
import { leaderboardRouter } from "./api/leaderboard";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  game: gameRouter,
  leaderboard: leaderboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
