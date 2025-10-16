import championData from "@/lib/data/championFiltered.json";
import { ChampionData } from "../../shared/icons/types/champion";

const championMap: Record<string, ChampionData> = championData;

export function getChampionById(id: number): ChampionData | undefined {
  return championMap[id.toString()];
}
