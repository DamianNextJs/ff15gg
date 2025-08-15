import { RankedData } from "@/types/riot";

export function getRankData(ranked: RankedData[], type: "solo" | "flex") {
  const queueKey = type === "solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
  return ranked.find((q) => q.queueType === queueKey) ?? null;
}
