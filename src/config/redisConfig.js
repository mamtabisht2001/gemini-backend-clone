import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

export const redis = new Redis(
  { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
  {
    tls: process.env.REDIS_URL.startsWith("rediss://") ? {} : undefined,
    socket: {
      reconnectStrategy: () => 1000,
    },
  },
);

redis.on("connect", () => console.log("Redis connected successfully"));
redis.on("error", (err) => console.error("Redis error:", err));

try {
  if (redis.status === "end" || redis.status === "uninitialized") {
    await redis.connect();
  }
} catch (err) {
  console.error("Redis connection failed:", err.message);
}
