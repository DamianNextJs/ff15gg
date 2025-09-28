import { SummonerSpellInfo } from "@/types/summonerSpell";
import { DDragon } from "@/utils/ddragon";
import { SummonerSpellMap } from "@/lib/maps/summonerSpellMap";
import { RuneMap } from "@/lib/maps/runeMap";
import summonerSpellsData from "@/lib/data/summoner.json";

const typedSpellsData: Record<string, SummonerSpellInfo> =
  summonerSpellsData.data;

export function getSummonerSpellData(id: number) {
  const key = SummonerSpellMap[id];
  if (!key) return { data: undefined, icon: "" };
  const data = typedSpellsData[key];
  const icon = DDragon.summonerSpell(key);
  return { data, icon };
}

export function getRuneData(id: number) {
  const data = RuneMap[id];
  const icon = data ? DDragon.runeIcon(data.icon) : "";
  return { data, icon };
}
