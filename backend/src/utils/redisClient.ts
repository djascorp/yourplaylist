import { createClient, RedisClientType } from 'redis';

console.log("DOTENV", process.env.REDIS_URL);

// Create a Redis client
const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL // Redis connection URL
});

// Handle connection errors
redisClient.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect();

export default redisClient;
