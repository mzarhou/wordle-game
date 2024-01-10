import { type Config } from "drizzle-kit";
import { DATABASE_URL } from "~/server/db";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
} satisfies Config;
