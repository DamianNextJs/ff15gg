import runesData from "@/lib/data/runesReforged.json";
import { RuneInfo, RuneStyle } from "@/types/rune";

// Flatten rune styles + runes into a Record
export const RuneMap: Record<number, RuneInfo> = (() => {
  const map: Record<number, RuneInfo> = {};

  for (const style of runesData as RuneStyle[]) {
    // Add the style itself (used for subStyle icon/name)
    map[style.id] = {
      id: style.id,
      key: style.key,
      icon: style.icon,
      name: style.name,
    };

    // Add all runes inside its slots
    for (const slot of style.slots) {
      for (const rune of slot.runes) {
        map[rune.id] = rune;
      }
    }
  }

  return map;
})();
