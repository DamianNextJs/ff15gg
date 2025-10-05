import { ChampionSpell } from "@/types/champion";

export default function ChampionSpellTooltip({
  spell,
}: {
  spell: ChampionSpell;
}) {
  const cooldownDisplay = [...new Set(spell.cooldown)].join("/");
  return (
    <div className="text-xs">
      <strong className="text-blue-500 text-sm">{spell.name}</strong>
      <div className="text-subtle/70">Cooldown: {cooldownDisplay}</div>
      <div className="my-2">{spell.description}</div>
    </div>
  );
}
