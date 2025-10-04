import { RuneStyle } from "@/types/rune";
import { getRuneData } from "@/utils/playerLoadout";
import Rune from "./Rune";

export default function RuneSlots({
  styleData,
  selectedRuneIds,
}: {
  styleData: RuneStyle;
  selectedRuneIds: number[];
}) {
  return (
    <div className="flex flex-col gap-2 lg:gap-4 w-full h-full justify-between">
      {styleData.slots.slice(1).map((slot, i) => (
        <div key={i} className="flex justify-around">
          {slot.runes.map((r) => {
            const { icon, data } = getRuneData(r.id);
            const isSelected = selectedRuneIds.includes(r.id);
            return (
              <Rune
                key={r.id}
                runeData={data}
                iconUrl={icon}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
