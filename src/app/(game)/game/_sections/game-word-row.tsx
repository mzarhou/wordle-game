import { WORD_LETTERS_COUNT } from "~/config/game-config";
import { cn } from "~/lib/utils";
import type { Letter } from "~/types/game-state.type";

export function GameWordRow({ word }: { word: Letter[] | undefined }) {
  return (
    <>
      {Array(WORD_LETTERS_COUNT)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex aspect-square items-center justify-center rounded-lg border text-4xl transition-all duration-300 md:text-6xl",
              {
                "bg-primary": word?.[i]?.status === "correct",
                "bg-secondary": word?.[i]?.status === "valid",
              },
            )}
          >
            {word?.[i]?.letter.toUpperCase()}
          </div>
        ))}
    </>
  );
}
