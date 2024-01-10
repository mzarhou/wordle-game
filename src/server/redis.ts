import Redis from "ioredis";
import { env } from "~/env";

export const redis = new Redis({
  password: env.REDIS_PASSWORD,
  host: env.NODE_ENV === "development" ? "localhost" : "redis",
  port: 6379,
});
