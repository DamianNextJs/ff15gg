"use client";

import { ParticipantData } from "@/types/match";
import Image from "next/image";
import { DDragon } from "@/utils/ddragon";
import SummonerSpellIcon from "./PlayerLoadoutComponents/SummonerSpellIcon";
import RuneIcon from "./PlayerLoadoutComponents/RuneIcon";
import { getRuneData, getSummonerSpellData } from "@/utils/playerLoadout";
import { getChampionById } from "@/helper/getChampionById";

export default function PlayerLoadout({
  participant,
  sm,
}: {
  participant: ParticipantData;
  sm?: boolean;
}) {
  // Champion
  const champ = getChampionById(participant.championId);

  const champIconUrl = DDragon.championIcon(champ?.id ?? "");
  const champLevel = participant.champLevel;

  // Summoner Spells
  const { data: summoner1Data, icon: summoner1Icon } = getSummonerSpellData(
    participant.summoner1Id
  );
  const { data: summoner2Data, icon: summoner2Icon } = getSummonerSpellData(
    participant.summoner2Id
  );

  // Runes
  const { data: keyStoneData, icon: keyStoneIcon } = getRuneData(
    participant.perks.styles[0].selections[0].perk
  );
  const { data: subStyleData, icon: subStyleIcon } = getRuneData(
    participant.perks.styles[1].style
  );

  return (
    <div className={`grid grid-cols-4 ${sm ? "gap-0.5" : "gap-1"} max-w-fit`}>
      {/* Champ Icon */}
      <div className={`col-span-2 relative ${sm ? "size-9" : "size-13"}`}>
        <Image src={champIconUrl} fill alt={participant.championName} />
        <span
          className={`${
            sm ? "text-[0.5rem]" : "text-xs"
          } font-medium absolute right-0 bottom-0 bg-accent px-0.5`}
        >
          {champLevel}
        </span>
      </div>

      {/* Summoner Spells */}
      <div className="col-span-1 flex flex-col gap-1">
        <SummonerSpellIcon
          sm={sm}
          spellData={summoner1Data}
          iconUrl={summoner1Icon}
        />
        <SummonerSpellIcon
          sm={sm}
          spellData={summoner2Data}
          iconUrl={summoner2Icon}
        />
      </div>

      {/* Runes */}
      {keyStoneIcon && subStyleIcon ? (
        <div className="col-span-1 flex flex-col gap-1">
          <RuneIcon sm={sm} runeData={keyStoneData} iconUrl={keyStoneIcon} />
          <RuneIcon sm={sm} runeData={subStyleData} iconUrl={subStyleIcon} />
        </div>
      ) : null}
    </div>
  );
}
