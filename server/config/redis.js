import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (err) => console.log(err));

export async function InitializeRedis() {
  try {
    await redisClient.connect();
    console.log("redis is connected");
  } catch (error) {
    console.log("failed to connect redis", error);
  }
}
