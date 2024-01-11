import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, queryClient as connection } from ".";

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });

// Don't forget to close the connection, otherwise the script will hang
await connection.end();
