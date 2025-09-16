"use server";

import { fetchAndCacheSummoner } from "@/lib/server/fetchAndCacheSummoner";

// Server action: forces a fresh Riot fetch and updates cache
export async function updateSummonerProfile(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string
) {
  await fetchAndCacheSummoner(region, platform, gameName, tagLine, true);
}
