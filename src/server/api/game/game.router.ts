import { createTRPCRouter, protectedProcedure } from "~/server/trpc";
import { wordValidator } from "~/lib/validators/game.validator";
import { TRPCError } from "@trpc/server";
import {
  addNewWord,
  generateNewGame,
  getGameState,
  setGameState,
} from "./game.storage";
import { getRandomWord, splitWordIntoLetters } from "./game.helpers";
import { RETRY_COUNT } from "~/config/game-config";
import { protectedCurrentGameProcedure } from "./game.middleware";
import { incrementUserScore } from "./game.repository";
import { currentUser } from "@clerk/nextjs";
import { WORDS } from "./game.data";

export const gameRouter = createTRPCRouter({
  generateWord: protectedProcedure.mutation(async ({ ctx }) => {
    await generateNewGame(ctx.userId, getRandomWord());
  }),

  getGameState: protectedProcedure.query(async ({ ctx }) => {
    let gameState = await getGameState(ctx.userId);
    if (!gameState) {
      gameState = await generateNewGame(ctx.userId, getRandomWord());
    }
    return gameState.state;
  }),

  getTargetWord: protectedProcedure.query(async ({ ctx }) => {
    const gameState = await getGameState(ctx.userId);
    if (!gameState || !gameState.state.end) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return { word: gameState.word };
  }),

  submitWord: protectedCurrentGameProcedure
    .input(wordValidator)
    .mutation(
      async ({ input, ctx: { userId, gameState: oldGameState, db } }) => {
        if (!WORDS.includes(input.word)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Word does not exists",
          });
        }

        try {
          const word = splitWordIntoLetters({
            input: input.word,
            expectedWord: oldGameState.word,
          });

          const newGameState = await addNewWord(userId, word);

          if (input.word === oldGameState.word) {
            // game end - win
            // game state `currentIndex` increment in the previous step
            const user = await currentUser();
            if (!user?.username) throw new Error("Invalid user name");
            await incrementUserScore(db, {
              userId,
              username: user.username,
              incrementBy: RETRY_COUNT - oldGameState.state.currentIndex,
            });
            return await setGameState(userId, { end: true, won: true });
          }

          if (newGameState.state.words.length >= RETRY_COUNT) {
            // game end - lose
            return await setGameState(userId, { end: true, won: false });
          }
        } catch (_error) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Something went wrong",
          });
        }
      },
    ),
});
