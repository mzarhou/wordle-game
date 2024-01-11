import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function PlayAgainButton({ className }: { className?: string }) {
  const router = useRouter();

  const { mutate: resetGame, isLoading } = api.game.generateWord.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      disabled={isLoading}
      onClick={() => resetGame()}
      className={className}
    >
      Play Again
    </Button>
  );
}
