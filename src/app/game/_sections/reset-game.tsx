"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

export function ResetGame() {
  const router = useRouter();

  const { mutate, isLoading } = api.game.generateWord.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button size="icon" onClick={() => mutate()} disabled={isLoading}>
      <RotateCcw className={cn("h-4 w-4", { "animate-spin": isLoading })} />
    </Button>
  );
}
