import championData from "@/lib/data/champions.json";

interface Champion {
  id: string;
  key: string;
  name: string;
  image: string;
}

const championMap: Record<string, Champion> = championData;

//this function is to get the champion icon with id i think
export function getChampionById(id: number): Champion | undefined {
  return championMap[id.toString()];
}
