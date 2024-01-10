import { gameRouter } from "./api/game";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
