import {
  ItemMap,
  ChampionMap,
  SummonerSpellMap,
  StatShardMap,
  RuneMap,
  RuneTreeMap,
} from "@/lib/maps/data";
import {
  Item,
  Champion,
  SummonerSpell,
  StatShard,
  Rune,
  RuneTree,
} from "@/types/data";
import statShardJSON from "@/lib/data/statShard.json";

// ——— Lookups ———
// Fast O(1) access by numeric ID for direct data lookups (e.g. icon, name, desc)
export const getItemById = (id: number): Item => ItemMap[id];
export const getChampionById = (id: number): Champion => ChampionMap[id];
export const getSummonerSpellById = (id: number): SummonerSpell =>
  SummonerSpellMap[id];
export const getRuneById = (id: number): Rune => RuneMap[id];
export const getRuneTreeById = (id: number): RuneTree => RuneTreeMap[id];
export const getStatShardById = (id: number): StatShard => StatShardMap[id];

// ——— Collections ———
// Return all data of a given type.
// Used for displaying full lists or selectable UIs (e.g rune trees, items)
export const allItems = (): Item[] => Object.values(ItemMap);
export const allChampions = (): Champion[] => Object.values(ChampionMap);
export const allSummonerSpells = (): SummonerSpell[] =>
  Object.values(SummonerSpellMap);
export const allRunes = (): Rune[] => Object.values(RuneMap);
export const allRuneTrees = (): RuneTree[] => Object.values(RuneTreeMap);

//  Preserves Riot's stat shard row strucutre (for rune pages).
export const allStatShardSlots = (): StatShard[][] =>
  Object.values(statShardJSON);
