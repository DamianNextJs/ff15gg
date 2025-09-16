import { cache } from "react";
import { fetchAndCacheSummoner } from "@/lib/server/fetchAndCacheSummoner";

export const getSummonerData = cache(
  async (
    region: string,
    platform: string,
    gameName: string,
    tagLine: string,
    force = false
  ) => {
    return await fetchAndCacheSummoner(
      region,
      platform,
      gameName,
      tagLine,
      force
    );
  }
);
