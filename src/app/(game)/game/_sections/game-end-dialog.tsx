"use client";

import { PartyPopper, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import type { GameState } from "~/types/game-state.type";
import FullLoader from "~/components/full-loader";
import { PlayAgainButton } from "./play-again-btn";

export function GameEndDialog({ gameState }: { gameState: GameState }) {
  const [open, setOpen] = useState(true);
  const { data, isLoading } = api.game.getTargetWord.useQuery();

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogContent className="flex items-center justify-center">
        {isLoading ? (
          <FullLoader />
        ) : (
          <div className="flex flex-col items-center space-y-12 py-10">
            <div className="space-y-8">
              {gameState.won ? (
                <>
                  <div className="text-center text-xl font-semibold">
                    You won
                  </div>
                  <PartyPopper className="h-20 w-20" />
                </>
              ) : (
                <>
                  <div className="text-center text-xl font-semibold">
                    You lose
                  </div>
                  <X className="h-20 w-20" />
                </>
              )}
            </div>
            <div className="space-x-2">
              <span>The word was: </span>
              <span className="text-lg font-semibold">
                {data?.word.toUpperCase()}
              </span>
            </div>
            <PlayAgainButton />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
