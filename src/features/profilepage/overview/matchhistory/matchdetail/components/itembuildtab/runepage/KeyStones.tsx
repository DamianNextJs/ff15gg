import { Rune as RuneType } from "@/types/data";
import Rune from "./Rune";
import { DDragon } from "@/utils/ddragon";

export default function KeyStones({
  keystones,
  selectedRuneIds,
}: {
  keystones: RuneType[];
  selectedRuneIds: number[];
}) {
  return (
    <div className="flex border-b border-white/10 pb-3 lg:pb-6 w-full justify-around">
      {keystones.map((k) => {
        const isSelected = selectedRuneIds.includes(k.id);
        const icon = DDragon.runeIcon(k.icon);
        return (
          <Rune
            key={k.id}
            runeData={k}
            iconUrl={icon}
            isSelected={isSelected}
            isKeyStone={true}
          />
        );
      })}
    </div>
  );
}
