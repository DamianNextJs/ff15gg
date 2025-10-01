import { SummonerSpellInfo } from "@/types/summonerSpell";

export default function SummonerSpellTooltip({
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
