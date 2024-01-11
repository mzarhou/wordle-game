import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "~/env";

export const DATABASE_URL = `postgres://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@db:5432/${env.POSTGRES_DB}`;
export const queryClient = postgres(DATABASE_URL);

export const db = drizzle(queryClient, { schema });

export type Database = typeof db;
