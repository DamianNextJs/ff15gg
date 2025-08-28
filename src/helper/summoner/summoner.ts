import { RankedData } from "@/types/riot";

// fetch corresponding data for solo or flex
export function getRankData(ranked: RankedData[], type: "solo" | "flex") {
  const queueKey = type === "solo" ? "RANKED_SOLO_5x5" : "RANKED_FLEX_SR";
  return ranked.find((q) => q.queueType === queueKey) ?? null;
}

//riot api returns role, position etc in a weird way we map over them to get the exact role
export function MapRole(
  lane: string,
  role: string
): "TOP" | "JUNGLE" | "MIDDLE" | "ADC" | "SUPPORT" | null {
  if (lane === "TOP" && role === "SOLO") return "TOP";
  if (lane === "JUNGLE") return "JUNGLE";
  if (lane === "MIDDLE" && role === "SOLO") return "MIDDLE";
  if (lane === "BOTTOM" && "DUO_CARRY") return "ADC";
  if (lane === "BOTTOM" && "DUO_SUPPORT") return "SUPPORT";
  return null;
}

// make sure summonername is stored consistently in our db
export function normalizeSummonerName(gameName: string, tagLine: string) {
  return {
    gameName: gameName.replace(/\s+/g, "").toLowerCase(),
    tagLine: tagLine.replace(/\s+/g, "").toLowerCase(),
  };
}
