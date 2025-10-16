import { getStatShards } from "@/lib/maps/runeMap";
import Rune from "./Rune";
import { getRuneData } from "@/features/shared/icons/utils/icons";

export type StatShardIds = {
  offense: number;
  flex: number;
  defense: number;
};

export default function StatShards({
  selectedShardIds,
}: {
  selectedShardIds: StatShardIds;
}) {
  const statShards = getStatShards();

  const slotKeys: (keyof StatShardIds)[] = ["offense", "flex", "defense"];

  return (
    <div className="flex flex-col gap-2 lg:gap-4 w-full border-t border-white/10 pt-3">
      {statShards.map((statSlot, i) => (
        <div key={i} className="flex justify-around">
          {statSlot.map((stat) => {
            const { data, icon } = getRuneData(stat.id);
            const slotKey = slotKeys[i];
            const isSelected = selectedShardIds[slotKey] === stat.id;

            return (
              <Rune
                key={stat.id}
                runeData={data}
                iconUrl={icon}
                isSelected={isSelected}
                isStatShard={true}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
