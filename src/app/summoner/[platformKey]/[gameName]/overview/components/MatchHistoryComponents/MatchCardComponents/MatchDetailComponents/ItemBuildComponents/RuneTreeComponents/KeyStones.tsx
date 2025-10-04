import { RuneInfo } from "@/types/rune";
import { getRuneData } from "@/utils/playerLoadout";
import Rune from "./Rune";

export default function KeyStones({
  keystones,
  selectedRuneIds,
}: {
  keystones: RuneInfo[];
  selectedRuneIds: number[];
}) {
  return (
    <div className="flex border-b border-white/10 pb-3 w-full justify-around">
      {keystones.map((k) => {
        const { icon, data } = getRuneData(k.id);
        const isSelected = selectedRuneIds.includes(k.id);
        return (
          <Rune
            key={k.id}
            runeData={data}
            iconUrl={icon}
            isSelected={isSelected}
            isKeyStone={true}
          />
        );
      })}
    </div>
  );
}
