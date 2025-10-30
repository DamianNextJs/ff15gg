import itemJSON from "@/lib/data/itemFiltered.json";
import championJSON from "@/lib/data/championFiltered.json";
import summonerSpellJSON from "@/lib/data/summonerSpellFiltered.json";
import statShardJSON from "@/lib/data/statShard.json";
import runeJSON from "@/lib/data/runeFiltered.json";
import {
  Champion,
  Item,
  Rune,
  RuneTree,
  StatShard,
  SummonerSpell,
} from "@/types/data";

// ——— ItemMap ———
// Numeric item ID -> item data
export const ItemMap: Record<number, Item> = Object.fromEntries(
  Object.entries(itemJSON).map(([id, item]) => [
    Number(id),
    { id: Number(id), ...item },
  ])
);

// ——— ChampionMap ———
// Numeric Riot key -> champion data
export const ChampionMap: Record<number, Champion> = Object.fromEntries(
  Object.entries(championJSON).map(([id, champ]) => [
    Number(id),
    { key: Number(id), ...champ },
  ])
);

// ——— SummonerSpellMap ———
// Numeric spell key -> summoner spell data
export const SummonerSpellMap: Record<number, SummonerSpell> =
  Object.fromEntries(
    Object.entries(summonerSpellJSON).map(([id, summonerSpell]) => [
      Number(id),
      summonerSpell,
    ])
  );

// ——— StatShardMap ———
// Flattens all rows of stat shard into on map for fast ID lookups.
// Duplicates are removed, which is fine for lookups.
export const StatShardMap: Record<number, StatShard> = Object.fromEntries(
  Object.values(statShardJSON)
    .flat()
    .map((shard) => [shard.id, shard])
);

// ——— RuneMap ———
// Flat map of all individual runes across all rune trees.
export const RuneMap: Record<number, Rune> = Object.fromEntries(
  Object.values(runeJSON).flatMap((tree) =>
    tree.slots.flatMap((slot) => slot.map((rune) => [rune.id, rune]))
  )
);

// ——— RuneTreeMap ———
// Top-level map of rune trees (Precision, Domination, etc.)
// Each contains rune slots preserving Riot's ordering
export const RuneTreeMap: Record<number, RuneTree> = Object.fromEntries(
  Object.entries(runeJSON).map(([id, tree]) => [
    Number(id),
    {
      id: Number(id),
      ...tree,
      slots: tree.slots.map((slot) => slot.map((rune) => ({ ...rune }))),
    },
  ])
);
