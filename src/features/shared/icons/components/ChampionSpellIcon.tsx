import Tooltip from "@/components/Tooltip";

import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import { ChampionSpell } from "../types/champion";

export function ChampionSpellIcon({
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

export function ChampionSpellTooltip({ spell }: { spell: ChampionSpell }) {
  const cooldownDisplay = [...new Set(spell.cooldown)].join("/");
  return (
    <div className="text-xs">
      <strong className="text-blue-500 text-sm">{spell.name}</strong>
      <div className="text-subtle/70">Cooldown: {cooldownDisplay}</div>
      <div className="my-2">{spell.description}</div>
    </div>
  );
}
