"use client";

import { type FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { ResetGame } from "./_components";
import { RETRY_COUNT, WORD_LETTERS_COUNT } from "~/config/game-config";

export default function GamePage() {
  const [words, setWords] = useState<string[]>(Array(RETRY_COUNT).fill(""));
  const [remainingAttempts, setRemainingAttempts] =
    useState<number>(RETRY_COUNT);

  const currentWordIndex = RETRY_COUNT - remainingAttempts;
  const currentWord = words[currentWordIndex];

  const { mutate: submitWord, isLoading } = api.game.submitWord.useMutation({
    onSuccess: () => {
      toast.success("You won");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setRemainingAttempts((r) => r - 1);
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!words[currentWordIndex]) return;
    submitWord({ word: words[currentWordIndex]! });
  };

  return (
    <div className="p-10">
      <div className="mx-auto max-w-[470px] space-y-4">
        <div className="flex items-center justify-between">
          <p className="space-x-2 text-sm text-foreground/70">
            <span>Remaining Attempts:</span>
            <span className="font-semibold">{remainingAttempts}</span>
          </p>
          <ResetGame />
        </div>
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {Array(RETRY_COUNT)
            .fill(null)
            .map((_, index) => (
              <WordRow key={index} word={words[index] ?? ""} />
            ))}
        </div>

        <form className="flex space-x-4" onSubmit={handleSubmit}>
          <Input
            autoFocus
            name="word"
            className="px-4 py-6 md:px-6 md:py-8 md:text-xl"
            placeholder="guess the word"
            disabled={isLoading}
            value={currentWord}
            onChange={(e) =>
              setWords((oldWords) => {
                oldWords[currentWordIndex] = e.target.value;
                return [...oldWords];
              })
            }
            maxLength={5}
          />
          <Button className="h-[50px] md:h-[64px] md:text-lg">Submit</Button>
        </form>
      </div>
    </div>
  );
}

function WordRow({ word }: { word: string }) {
  return (
    <>
      {Array(WORD_LETTERS_COUNT)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex  aspect-square items-center justify-center rounded-lg border text-6xl md:text-7xl"
          >
            {word[i]?.toUpperCase()}
          </div>
        ))}
    </>
  );
}
