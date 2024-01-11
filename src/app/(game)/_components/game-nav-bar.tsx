"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function GameNavBar() {
  const router = useRouter();

  return (
    <div className="relative flex h-[60px] items-center justify-between">
      <Link href="/game">
        <h1 className="font-semibold">Wordle</h1>
      </Link>
      <Tabs defaultValue="game" className="absolute left-[50%] -ml-[89.1px]">
        <TabsList>
          <TabsTrigger value="game" onClick={() => router.replace("/game")}>
            Game
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            onClick={() => router.replace("/leaderboard")}
          >
            Leaderboard
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <UserButton />
    </div>
  );
}
