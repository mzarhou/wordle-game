import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function PlayAgainButton() {
  const router = useRouter();

  const { mutate: resetGame, isLoading } = api.game.generateWord.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button disabled={isLoading} onClick={() => resetGame()}>
      Play Again
    </Button>
  );
}
