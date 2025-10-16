import { RankedData } from "@/types/summoner";

// help find rank data for either solo or flex. return null if unranked
export function findRankData(
  ranked: RankedData[],
  type: "Ranked Solo" | "Ranked Flex"
) {
  const queueKey =
    type === "Ranked Solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
  return ranked.find((q) => q.queueType === queueKey) ?? null;
}
