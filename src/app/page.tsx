import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center lg:flex-row">
      <div className="flex flex-col space-y-6 px-8 text-foreground/80">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-semibold lg:text-7xl">Wordle Game</h1>
          <p className="max-w-[400px] text-2xl text-foreground/60">
            Rank your name, a game where you expand your vocabulary
          </p>
        </div>
        <div>
          <Link href="/game">
            <Button
              size="lg"
              className="rounded-full px-20 py-8 text-2xl"
              variant="secondary"
            >
              Play
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden w-[45%] max-w-screen-md lg:block">
        <Image
          src="/hero.png"
          width={1080}
          height={1080}
          alt=""
          className="w-full"
        />
      </div>
    </div>
  );
}
