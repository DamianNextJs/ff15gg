import Tooltip from "@/components/Tooltip";
import { SummonerSpellInfo } from "@/types/summonerSpell";
import Image from "next/image";
import { SummonerSpellTooltip } from "./SummonerSpellTooltip";

export const SummonerSpellIcon = (
  spellData?: SummonerSpellInfo,
  iconUrl?: string
) => {
  if (!spellData || !iconUrl)
    return <div className="size-5 bg-white/10 rounded-sm" />;
  return (
    <Tooltip content={<SummonerSpellTooltip summonerSpell={spellData} />}>
      <Image src={iconUrl} width={23} height={23} alt={spellData.name} />
    </Tooltip>
  );
};
