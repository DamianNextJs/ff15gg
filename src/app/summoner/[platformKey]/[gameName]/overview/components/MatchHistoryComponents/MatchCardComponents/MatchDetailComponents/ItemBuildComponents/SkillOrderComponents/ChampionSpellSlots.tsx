import { getChampionById } from "@/helper/getChampionById";
import ChampionSpellIcon from "./ChampionSpellIcon";

export default function ChampionSpellSlots({
  participantChampionId,
}: {
  participantChampionId: number;
}) {
  const champion = getChampionById(participantChampionId);

  return (
    <div className="flex flex-col gap-2 w-fit">
      {champion?.spells.map((spell, i) => {
        return (
          <ChampionSpellIcon slot={i} key={spell.id} championSpell={spell} />
        );
      })}
    </div>
  );
}
