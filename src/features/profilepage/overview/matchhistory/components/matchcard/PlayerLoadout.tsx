"use client";

import { ParticipantData } from "@/types/match";
import { SummonerSpellIcon } from "@/features/shared/icons/components/SummonerSpellIcon";
import { RuneIcon } from "@/features/shared/icons/components/RuneIcon";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";

export default function PlayerLoadout({
  participant,
  sm,
}: {
  participant: ParticipantData;
  sm?: boolean;
}) {
  return (
    <div className={`grid grid-cols-4 ${sm ? "gap-0.5" : "gap-1"} max-w-fit`}>
      {/* Champ Icon */}
      <div className="col-span-2">
        <ChampionIcon
          championId={participant.championId}
          size={sm ? "md" : "xl"}
          level={participant.champLevel}
        />
      </div>

      {/* Summoner Spells */}
      <div className="col-span-1 flex flex-col gap-1">
        <SummonerSpellIcon sm={sm} summonerSpellId={participant.summoner1Id} />
        <SummonerSpellIcon sm={sm} summonerSpellId={participant.summoner2Id} />
      </div>

      {/* Runes */}

      <div className="col-span-1 flex flex-col gap-1">
        <RuneIcon
          sm={sm}
          runeId={participant.perks.styles[0].selections[0].perk}
        />
        <RuneIcon
          sm={sm}
          runeId={participant.perks.styles[1].style}
          isTree={true}
        />
      </div>
    </div>
  );
}
