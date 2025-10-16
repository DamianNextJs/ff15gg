import { cache } from "react";
import { fetchAndCacheSummoner } from "../lib/fetchAndCacheSummoner";

export const getSummonerData = cache(
  (region: string, platform: string, gameName: string, tagLine: string) =>
    fetchAndCacheSummoner(region, platform, gameName, tagLine)
);
