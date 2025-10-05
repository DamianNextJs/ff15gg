import Tooltip from "@/components/Tooltip";
import { ChampionSpell } from "@/types/champion";
import ChampionSpellTooltip from "./ChampionSpellTooltip";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";

export default function ChampionSpellIcon({
  championSpell,
  slot,
}: {
  championSpell: ChampionSpell;
  slot: number;
}) {
  const champSpellIconUrl = DDragon.championSpell(championSpell.image);
  const slots = ["Q", "W", "E", "R"];
  return (
    <Tooltip content={<ChampionSpellTooltip spell={championSpell} />}>
      <div className={`relative size-6`}>
        <Image
          src={champSpellIconUrl}
          alt={championSpell.name}
          fill
          className="rounded-sm"
        />
        <div className="text-[10px] absolute -right-1 -bottom-1 bg-accent px-0.5 rounded-full pointer-events-none">
          {slots[slot]}
        </div>
      </div>
    </Tooltip>
  );
}
