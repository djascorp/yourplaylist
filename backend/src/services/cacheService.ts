import redisClient from '../utils/redisClient';

const DEFAULT_EXPIRATION = 3600; // 1 hour

/**
 * Retrieves data from cache or executes a callback to fetch and cache it.
 * @param key The cache key.
 * @param cb The callback function to execute if data is not in cache.
 * @param expiration The expiration time for the cache in seconds. Defaults to 1 hour.
 * @returns A Promise that resolves to the cached or freshly fetched data.
 */
export const getOrSetCache = async <T>(key: string, cb: () => Promise<T>, expiration: number = DEFAULT_EXPIRATION): Promise<T> => {
  const cachedData = await redisClient.get(key);
  if (cachedData != null) {
    return JSON.parse(cachedData) as T;
  }

  const freshData = await cb();
  await redisClient.setEx(key, expiration, JSON.stringify(freshData));
  return freshData;
};

/**
 * Invalidates (deletes) a specific key from the cache.
 * @param key The cache key to invalidate.
 * @returns A Promise that resolves to the number of keys removed.
 */
export const invalidateCache = async (key: string): Promise<number> => {
  return redisClient.del(key);
};