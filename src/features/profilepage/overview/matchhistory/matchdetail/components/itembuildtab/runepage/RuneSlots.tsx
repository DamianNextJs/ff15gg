import { Rune as RuneType } from "@/types/data";
import Rune from "./Rune";
import { DDragon } from "@/utils/ddragon";

export default function RuneSlots({
  slots,
  selectedRuneIds,
}: {
  slots: RuneType[][];
  selectedRuneIds: number[];
}) {
  return (
    <div className="flex flex-col justify-between gap-2 lg:gap-4 w-full h-full">
      {slots.map((slot, i) => (
        <div key={i} className="grid grid-cols-3 justify-items-center">
          {slot.map((rune) => {
            const isSelected = selectedRuneIds.includes(rune.id);
            const icon = DDragon.runeIcon(rune.icon);
            return (
              <Rune
                key={rune.id}
                runeData={rune}
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
