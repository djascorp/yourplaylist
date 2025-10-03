import { createClient, RedisClientType } from 'redis';

console.log("DOTENV", process.env.REDIS_URL);

/**
 * Initializes and connects to the Redis client.
 * The Redis URL is retrieved from environment variables.
 */
const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL // Redis connection URL
});

/**
 * Event listener for Redis connection errors.
 * Logs any errors that occur during the Redis connection.
 */
redisClient.on('error', (err: Error) => {
  console.error('Redis error:', err);
});

/**
 * Connects the Redis client to the Redis server.
 */
redisClient.connect();

export default redisClient;