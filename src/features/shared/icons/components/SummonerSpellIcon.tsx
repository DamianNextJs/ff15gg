import Tooltip from "@/components/Tooltip";

import Image from "next/image";
import { SummonerSpellInfo } from "../types/summonerSpell";

interface SummonerSpellIconProps {
  sm?: boolean;
  spellData?: SummonerSpellInfo;
  iconUrl?: string;
}

export function SummonerSpellIcon({
  sm = false,
  spellData,
  iconUrl,
}: SummonerSpellIconProps) {
  if (!spellData || !iconUrl)
    return (
      <div className={`${sm ? "size-4" : "size-6"} bg-white/10 rounded-xs`} />
    );
  return (
    <Tooltip content={<SummonerSpellTooltip summonerSpell={spellData} />}>
      <div className={`${sm ? "size-4" : "size-6"} relative`}>
        <Image src={iconUrl} fill alt={spellData.name} className="rounded-xs" />
      </div>
    </Tooltip>
  );
}

export function SummonerSpellTooltip({
  summonerSpell,
}: {
  summonerSpell: SummonerSpellInfo;
}) {
  return (
    <div className="text-xs">
      <strong className="text-blue-500 text-sm">{summonerSpell.name}</strong>
      <div className="mt-1">{summonerSpell.description}</div>
    </div>
  );
}
