import { ReactNode } from "react";
import { GameNavBar } from "./_components";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-md">
      <GameNavBar />
      {children}
    </div>
  );
}
