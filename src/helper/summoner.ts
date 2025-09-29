import { RankedData } from "@/types/summoner";

// fetch corresponding data for solo or flex
export function getRankData(
  ranked: RankedData[],
  type: "Ranked Solo" | "Ranked Flex"
) {
  const queueKey =
    type === "Ranked Solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
  return ranked.find((q) => q.queueType === queueKey) ?? null;
}

// make sure summonername is stored consistently in our db
export function normalizeSummonerName(gameName?: string, tagLine?: string) {
  return {
    gameName: (gameName ?? "").replace(/\s+/g, "").toLowerCase(),
    tagLine: (tagLine ?? "").replace(/\s+/g, "").toLowerCase(),
  };
}

// used to create consistent url's for summoner pages
export function createSummonerUrl(gameName: string, tagLine: string) {
  const { gameName: normalizedName, tagLine: normalizedTag } =
    normalizeSummonerName(gameName, tagLine);
  return `${normalizedName}-${normalizedTag}`;
}
