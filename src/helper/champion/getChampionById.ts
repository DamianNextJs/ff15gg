import championData from "@/lib/data/champions.json";

interface Champion {
  id: string;
  key: string;
  name: string;
  image: string;
}

const championMap: Record<string, Champion> = championData;

export function getChampionById(id: number): Champion | undefined {
  return championMap[id.toString()];
}
