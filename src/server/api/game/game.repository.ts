import { sql } from "drizzle-orm";
import type { Database } from "~/server/db";
import { users } from "~/server/db/schema";

export const incrementUserScore = async (
  db: Database,
  {
    userId,
    username,
    incrementBy,
  }: {
    userId: string;
    username: string;
    incrementBy: number;
  },
) => {
  if (incrementBy <= 0) return;
  await db
    .insert(users)
    .values({ id: userId, score: incrementBy, username })
    .onConflictDoUpdate({
      target: users.id,
      set: { score: sql`${users.score} + ${incrementBy}`, username },
    });
};
