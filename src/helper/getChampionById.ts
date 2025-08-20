import championData from "@/lib/champions.json";

interface Champion {
  id: string;
  key: string;
  name: string;
  image: { full: string };
}

const championMap: Record<number, Champion> = {};

Object.values(championData.data).forEach((champ: Champion) => {
  championMap[Number(champ.key)] = champ;
});

export function getChampionById(id: number) {
  return championMap[id];
}
