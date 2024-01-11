import { api } from "~/trpc/server";
import { GameEndDialog, Game } from "./_sections";

export default async function GamePage() {
  const data = await api.game.getGameState.query();

  return (
    <>
      <Game gameState={data} />
      {data.end && <GameEndDialog gameState={data} />}
    </>
  );
}
