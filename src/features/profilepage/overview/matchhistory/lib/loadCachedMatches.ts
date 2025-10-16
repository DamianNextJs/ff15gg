"use server";

import { fetchCachedMatches } from "../../lib/fetchCachedMatches";

// Server action: get more matches from cache if stored matches > 20
export async function loadCachedMatches(
  puuid: string,
  offset: number,
  limit: number
) {
  return await fetchCachedMatches(puuid, offset, limit);
}
