import { ParticipantData } from "@/types/match";

import RuneTree from "./RuneTree";

export default function RunePage({
  runes,
}: {
  runes: ParticipantData["perks"];
}) {
  return (
    <div>
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Runes
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:justify-items-center mt-3">
        <RuneTree
          runeStyle={runes.styles[0].style}
          selectedRuneIds={runes.styles[0].selections.map((s) => s.perk)}
          isPrimary={true}
        />
        <RuneTree
          runeStyle={runes.styles[1].style}
          selectedRuneIds={runes.styles[1].selections.map((s) => s.perk)}
          selectedStatIds={runes.statPerks}
        />
      </div>
    </div>
  );
}
