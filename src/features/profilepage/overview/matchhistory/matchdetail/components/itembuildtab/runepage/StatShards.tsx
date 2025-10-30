import { allStatShardSlots } from "@/utils/data";
import Rune from "./Rune";
import { DDragon } from "@/utils/ddragon";

export default function StatShards({
  selectedStatIds,
}: {
  selectedStatIds: { offense: number; flex: number; defense: number };
}) {
  const statShards = allStatShardSlots();
  const rowNames = ["offense", "flex", "defense"];

  return (
    <div className="flex flex-col justify-between gap-2 lg:gap-4 w-full border-t border-white/10 pt-3">
      {statShards.map((row, i) => {
        const rowName = rowNames[i];
        return (
          <div key={i} className="grid grid-cols-3 justify-items-center">
            {row.map((statShard) => {
              const isSelected =
                selectedStatIds[rowName as keyof typeof selectedStatIds] ===
                statShard.id;
              const icon = DDragon.runeIcon(statShard.icon);
              return (
                <Rune
                  key={statShard.id}
                  runeData={statShard}
                  iconUrl={icon}
                  isSelected={isSelected}
                  isStatShard={true}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
