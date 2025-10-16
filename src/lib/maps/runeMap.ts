import { RuneInfo, RuneStyle } from "@/features/shared/icons/types/rune";
import runesData from "@/lib/data/runesReforged.json";

// Flatten rune styles + runes into a Record
export const RuneMapBase: Record<number, RuneInfo> = (() => {
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

export const StatShardMap: Record<number, RuneInfo> = {
  // Adaptive Force
  5008: {
    id: 5008,
    key: "Adaptive Force",
    icon: "perk-images/StatMods/StatModsAdaptiveForceIcon.png",
    name: "Adaptive Force",
    shortDesc: "+9 Adaptive Force",
  },
  // Attack Speed
  5005: {
    id: 5005,
    key: "Attack Speed",
    icon: "perk-images/StatMods/StatModsAttackSpeedIcon.png",
    name: "Attack Speed",
    shortDesc: "+10% Attack Speed",
  },
  // Ability Haste
  5007: {
    id: 5007,
    key: "Ability Haste",
    icon: "perk-images/StatMods/StatModsCDRScalingIcon.png",
    name: "Ability Haste",
    shortDesc: "+8 Ability Haste",
  },
  // Health
  5011: {
    id: 5011,
    key: "Health",
    icon: "perk-images/StatMods/StatModsHealthScalingIcon.png",
    name: "Health",
    shortDesc: "+65 Health",
  },
  // Scaling Health
  5001: {
    id: 5001,
    key: "Health Scaling",
    icon: "perk-images/StatMods/StatModsHealthPlusIcon.png",
    name: "Health Scaling",
    shortDesc: "+10-180 Health (based on level)",
  },
  5010: {
    id: 5010,
    key: "Move Speed",
    icon: "perk-images/StatMods/StatModsMovementSpeedIcon.png",
    name: "Move Speed",
    shortDesc: "+2% Move Speed",
  },
  5013: {
    id: 5013,
    key: "Tenacity And Slow Resist",
    icon: "perk-images/StatMods/StatModsTenacityIcon.png",
    name: "Tenacity And Slow Resist",
    shortDesc: "+10% Tenacity and Slow Resist",
  },
};

export const RuneMap: Record<number, RuneInfo> = {
  ...RuneMapBase,
  ...StatShardMap,
};

export function getRunesForStyle(styleId: number): RuneStyle | undefined {
  return (runesData as RuneStyle[]).find((s) => s.id === styleId);
}

export function getStatShards(): RuneInfo[][] {
  return [
    [StatShardMap[5008], StatShardMap[5005], StatShardMap[5007]], // offense row
    [StatShardMap[5008], StatShardMap[5010], StatShardMap[5001]], // flex row
    [StatShardMap[5011], StatShardMap[5013], StatShardMap[5001]], // defense row
  ];
}
