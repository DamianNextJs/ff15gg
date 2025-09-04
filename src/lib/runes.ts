import runesRefored from "@/lib/data/runesReforged.json";

export type Rune = {
  id: number;
  key: string;
  icon: string;
  name: string;
};

export const runeMap: Record<number, Rune> = {};

runesRefored.forEach((tree) => {
  // Tree itself
  runeMap[tree.id] = {
    id: tree.id,
    key: tree.key,
    icon: tree.icon,
    name: tree.name,
  };

  tree.slots.forEach((slot) => {
    slot.runes.forEach((rune) => {
      runeMap[rune.id] = rune;
    });
  });
});
