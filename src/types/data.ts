// ——— Champion Data (from championFiltered.json) ———
// Includes both Riot's string `id` (e.g. "Aatrox") and numeric `key`.
export type Champion = {
  id: string; // Data Dragon string ID
  key: number; // Numeric Riot champion ID
  name: string;
  spells: {
    id: string;
    name: string;
    description: string;
    cooldown: number[];
    image: string;
  }[];
  passive: {
    name: string;
    description: string;
    image: string;
  };
};

// ——— Item Data (from itemFiltered.json) ———
// Simple numeric ID lookup.
export type Item = {
  id: number;
  name: string;
  description: string;
  gold: number;
  plaintext: string;
  maps: {
    11?: boolean;
    12?: boolean;
  };
};

// ——— Runes Data (from runeFiltered.json) ———
// RuneTree = major rune category (Precision, Sorcery, etc.)
// Each tree contains an array of rune slot rows -> Rune[][]
export type RuneTree = {
  id: number; // numeric id
  key: string;
  icon: string;
  name: string;
  slots: Rune[][];
};

// Individual rune inside a slot
export type Rune = {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc?: string;
  longDesc?: string;
};

// ——— Stat Shards (from statShard.json) ———
// Used for minor stats bonuses below rune trees.
export type StatShard = {
  id: number; // numeric id
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
};

// ——— Summoner Spells (from summonerSpellFiltered.json) ———
// Includes both the string ID (e.g. "SummonerFLash")
// and the numeric "key" stored as a string in Riot data.
export type SummonerSpell = {
  id: string;
  name: string;
  description: string;
  cooldown: number[];
  key: string; //  Numeric ID (as string in DDragon)
  modes: string[];
  image: string;
};
