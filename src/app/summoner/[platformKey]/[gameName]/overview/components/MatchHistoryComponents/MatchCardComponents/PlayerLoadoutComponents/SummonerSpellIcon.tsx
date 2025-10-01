import Tooltip from "@/components/Tooltip";
import { SummonerSpellInfo } from "@/types/summonerSpell";
import Image from "next/image";
import SummonerSpellTooltip from "./SummonerSpellTooltip";

interface SummonerSpellIconProps {
  sm?: boolean;
  spellData?: SummonerSpellInfo;
  iconUrl?: string;
}

export default function SummonerSpellIcon({
  sm = false,
  spellData,
  iconUrl,
}: SummonerSpellIconProps) {
  if (!spellData || !iconUrl)
    return (
      <div className={`${sm ? "size-4" : "size-6"} bg-white/10 rounded-sm`} />
    );
  return (
    <Tooltip content={<SummonerSpellTooltip summonerSpell={spellData} />}>
      <div className={`${sm ? "size-4" : "size-6"} relative`}>
        <Image src={iconUrl} fill alt={spellData.name} />
      </div>
    </Tooltip>
  );
}
