import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (err) => console.log("Failed to connect the redis"));

export async function InitializeRedis() {
  try {
    await redisClient.connect();
    console.log("redis is connected");
  } catch (error) {
    console.log("failed to connect redis", error);
  }
}
