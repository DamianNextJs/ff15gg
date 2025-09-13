import { SummonerSpellInfo } from "@/types/summonerSpell";

interface SummonerSpellToolTipProps {
  summonerSpell: SummonerSpellInfo;
}

export const SummonerSpellTooltip = ({
  summonerSpell,
}: SummonerSpellToolTipProps) => (
  <div className="text-xs">
    <strong className="text-blue-500 text-sm">{summonerSpell.name}</strong>
    <div className="mt-1">{summonerSpell.description}</div>
  </div>
);
