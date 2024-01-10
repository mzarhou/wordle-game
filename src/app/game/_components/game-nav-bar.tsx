import { UserButton } from "@clerk/nextjs";

export function GameNavBar() {
  return (
    <div className="flex h-[60px] items-center justify-between">
      <h1 className="font-semibold">Wordle Game</h1>
      <UserButton />
    </div>
  );
}
