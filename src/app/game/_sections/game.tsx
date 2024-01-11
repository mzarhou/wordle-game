"use client";

import { type FormEventHandler, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { RETRY_COUNT } from "~/config/game-config";
import type { GameState, Letter } from "~/types/game-state.type";
import { useRouter } from "next/navigation";
import { ResetGame } from "./reset-game";
import { PlayAgainButton } from "./play-again-btn";
import { GameWordRow } from "./game-word-row";

export function Game({ gameState }: { gameState: GameState }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [words, setWords] = useState<Letter[][]>(gameState.words);

  const currentWord =
    words[gameState.currentIndex]?.map((el) => el.letter).join("") ?? "";

  const setCurrentWord = (value: string) => {
    const letters = value.split("").map(
      (c) =>
        ({
          letter: c,
          status: "default",
        }) satisfies Letter,
    );
    setWords((w) => {
      w[gameState.currentIndex] = letters;
      return [...w];
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
    setWords(gameState.words);
  }, [gameState.words]);

  const { mutate: submitWord, isLoading } = api.game.submitWord.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!currentWord) return;
    if (currentWord.length !== 5) {
      return toast("Word must contain 5 characters");
    }
    submitWord({ word: currentWord });
  };

  return (
    <div className="p-10">
      <div className="mx-auto max-w-[470px] space-y-4">
        <div className="flex items-center justify-end">
          <ResetGame />
        </div>
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {Array(RETRY_COUNT)
            .fill(null)
            .map((_, index) => (
              <GameWordRow key={index} word={words[index]} />
            ))}
        </div>

        {gameState.end ? (
          <div className="flex justify-center">
            <PlayAgainButton />
          </div>
        ) : (
          <form className="flex space-x-4" onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              autoFocus
              name="word"
              className="px-4 py-6 md:px-6 md:py-8 md:text-xl"
              placeholder="guess the word"
              disabled={isLoading}
              value={currentWord}
              onChange={(e) => setCurrentWord(e.target.value)}
              maxLength={5}
            />
            <Button
              className="h-[50px] md:h-[64px] md:text-lg"
              disabled={isLoading}
            >
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
