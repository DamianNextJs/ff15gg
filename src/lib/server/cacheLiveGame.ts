import { LiveGameData } from "@/types/live-game";

interface LiveGameCacheEntry {
  data: LiveGameData | null;
  expiresAt: number;
}

const cache = new Map<string, LiveGameCacheEntry>();

/**
 * Get cached live gama data by puuid.
 * Returns null if not found or expired
 */
export function getCachedLiveGame(
  key: string
): LiveGameData | null | undefined {
  const entry = cache.get(key);
  if (!entry) return undefined;

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return undefined;
  }

  return entry.data;
}

/**
 * Store live game data in cache.
 * @param puuid the summoner's puuid
 * @param data The Live game data
 * @param ttl Time to live in ms (default 30s)
 */
export function setCachedLiveGame(
  key: string,
  data: LiveGameData | null,
  ttl = 30_000
) {
  cache.set(key, { data, expiresAt: Date.now() + ttl });
}
