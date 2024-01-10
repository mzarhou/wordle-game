import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom(),
  username: varchar("username", { length: 256 }),
  score: integer("score").default(0),
});
