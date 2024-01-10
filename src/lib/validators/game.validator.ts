import { z } from "zod";

export const wordValidator = z.object({
  word: z.string(),
});
