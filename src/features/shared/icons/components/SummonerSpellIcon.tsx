import Tooltip from "@/components/Tooltip";
import { SummonerSpell } from "@/types/data";
import { getSummonerSpellById } from "@/utils/data";
import { DDragon } from "@/utils/ddragon";

import Image from "next/image";

interface SummonerSpellIconProps {
  sm?: boolean;
  summonerSpellId: number;
}

export function SummonerSpellIcon({
  sm = false,
  summonerSpellId,
}: SummonerSpellIconProps) {
  if (!summonerSpellId)
    return (
      <div className={`${sm ? "size-4" : "size-6"} bg-white/10 rounded-xs`} />
    );

  const summonerSpellData = getSummonerSpellById(summonerSpellId);
  const summonerSpellIcon = DDragon.summonerSpell(summonerSpellData.image);

  return (
    <Tooltip
      content={<SummonerSpellTooltip summonerSpell={summonerSpellData} />}
    >
      <div className={`${sm ? "size-4" : "size-6"} relative`}>
        <Image
          src={summonerSpellIcon}
          fill
          alt={summonerSpellData.name}
          className="rounded-xs"
        />
      </div>
    </Tooltip>
  );
}

export function SummonerSpellTooltip({
  summonerSpell,
}: {
  summonerSpell: SummonerSpell;
}) {
  return (
    <div className="text-xs">
      <strong className="text-blue-500 text-sm">{summonerSpell.name}</strong>
      <div className="mt-1">{summonerSpell.description}</div>
    </div>
  );
}
