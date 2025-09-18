import { fetchAndCacheSummoner } from "@/lib/server/fetchAndCacheSummoner";
import { cache } from "react";

export const getSummonerData = cache(
  (region: string, platform: string, gameName: string, tagLine: string) =>
    fetchAndCacheSummoner(region, platform, gameName, tagLine)
);
