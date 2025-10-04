import { getRunesForStyle } from "@/lib/maps/runeMap";
import RuneSlots from "./RuneSlots";
import KeyStones from "./KeyStones";
import RuneTreeHeader from "./RuneTreeHeader";
import StatShards, { StatShardIds } from "./StatShards";

export default function RuneTree({
  runeStyle,
  selectedRuneIds,
  isPrimary,
  selectedStatIds,
}: {
  runeStyle: number;
  selectedRuneIds: number[];
  isPrimary?: boolean;
  selectedStatIds?: StatShardIds;
}) {
  const styleData = getRunesForStyle(runeStyle);
  if (!styleData) return null;

  return (
    <div className="flex flex-col gap-4 items-center lg:w-60">
      {/* Header */}
      <RuneTreeHeader runeStyle={runeStyle} />
      {/* Keystones Selection */}
      {isPrimary && (
        <KeyStones
          keystones={styleData.slots[0].runes}
          selectedRuneIds={selectedRuneIds}
        />
      )}
      {/* Slots */}
      <RuneSlots styleData={styleData} selectedRuneIds={selectedRuneIds} />
      {/* Stat Shards */}

      {!isPrimary && selectedStatIds && (
        <StatShards selectedShardIds={selectedStatIds} />
      )}
    </div>
  );
}
