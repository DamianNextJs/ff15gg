import { RankedData } from "@/types/riot";

// fetch corresponding data for solo or flex
export function getRankData(ranked: RankedData[], type: "solo" | "flex") {
  const queueKey = type === "solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
  return ranked.find((q) => q.queueType === queueKey) ?? null;
}

// make sure summonername is stored consistently in our db
export function normalizeSummonerName(gameName: string, tagLine: string) {
  return {
    gameName: gameName.replace(/\s+/g, "").toLowerCase(),
    tagLine: tagLine.replace(/\s+/g, "").toLowerCase(),
  };
}

// src/helper/summonerUrl.ts
export function createSummonerUrl(gameName: string, tagLine: string) {
  const { gameName: normalizedName, tagLine: normalizedTag } =
    normalizeSummonerName(gameName, tagLine);
  return `${normalizedName}-${normalizedTag}`;
}
