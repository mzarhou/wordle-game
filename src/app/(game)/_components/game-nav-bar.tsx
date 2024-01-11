"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function GameNavBar() {
  const pathname = usePathname();
  return (
    <div className="relative flex h-[60px] items-center justify-between">
      <Link href="/game">
        <h1 className="font-semibold">Wordle</h1>
      </Link>
      <Tabs
        defaultValue={pathname === "/leaderboard" ? "leaderboard" : "game"}
        className="absolute left-[50%] -ml-[89.1px]"
      >
        <TabsList>
          <TabsTrigger value="game">
            <Link href="/game">Game</Link>
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            <Link href="/leaderboard">Leaderboard</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <UserButton />
    </div>
  );
}
