import RuneSlots from "./RuneSlots";
import KeyStones from "./KeyStones";
import RuneTreeHeader from "./RuneTreeHeader";
import { getRuneTreeById } from "@/utils/data";
import StatShards from "./StatShards";

export default function RuneTree({
  runeStyle,
  selectedRuneIds,
  isPrimary,
  selectedStatIds,
}: {
  runeStyle: number;
  selectedRuneIds: number[];
  isPrimary?: boolean;
  selectedStatIds?: { offense: number; flex: number; defense: number };
}) {
  const styleData = getRuneTreeById(runeStyle);

  return (
    <div className="flex flex-col gap-4 items-center lg:w-60">
      {/* Header */}
      <RuneTreeHeader runeStyle={runeStyle} />
      {/* Keystones Selection */}
      {isPrimary && (
        <KeyStones
          keystones={styleData.slots[0]}
          selectedRuneIds={selectedRuneIds}
        />
      )}
      {/* Slots */}
      <RuneSlots
        slots={styleData.slots.slice(1)}
        selectedRuneIds={selectedRuneIds}
      />
      {/* Stat Shards */}

      {!isPrimary && selectedStatIds && (
        <StatShards selectedStatIds={selectedStatIds} />
      )}
    </div>
  );
}
