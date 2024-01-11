import { z } from "zod";
import { WORD_LETTERS_COUNT } from "~/config/game-config";

export const wordValidator = z.object({
  word: z.string().length(WORD_LETTERS_COUNT),
});
