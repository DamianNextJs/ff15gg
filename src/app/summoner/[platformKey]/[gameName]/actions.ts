"use server";

import { fetchAndCacheSummoner } from "@/lib/server/fetchAndCacheSummoner";
import { fetchCachedMatches } from "@/lib/server/fetchCachedMatches";

// Server action: forces a fresh Riot fetch and updates cache
export async function updateSummonerProfile(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string
) {
  await fetchAndCacheSummoner(region, platform, gameName, tagLine, true);
}

// Server action: get more matches from cache if stored matches > 20
export async function loadCachedMatches(
  puuid: string,
  offset: number,
  limit: number
) {
  return await fetchCachedMatches(puuid, offset, limit);
}
