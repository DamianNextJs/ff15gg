"use client";

import { ParticipantData } from "@/types/riot";
import Image from "next/image";
import { DDragon } from "@/utils/ddragon";
import { SummonerSpellIcon } from "./PlayerLoadoutComponents/SummonerSpellIcon";
import { RuneIcon } from "./PlayerLoadoutComponents/RuneIcon";
import { getRuneData, getSummonerSpellData } from "@/utils/playerLoadout";

export default function PlayerLoadout({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  // Champion
  const champIconUrl = DDragon.championIcon(myParticipant.championName);
  const champLevel = myParticipant.champLevel;

  // Summoner Spells
  const { data: summoner1Data, icon: summoner1Icon } = getSummonerSpellData(
    myParticipant.summoner1Id
  );
  const { data: summoner2Data, icon: summoner2Icon } = getSummonerSpellData(
    myParticipant.summoner2Id
  );

  // Runes
  const { data: keyStoneData, icon: keyStoneIcon } = getRuneData(
    myParticipant.perks.styles[0].selections[0].perk
  );
  const { data: subStyleData, icon: subStyleIcon } = getRuneData(
    myParticipant.perks.styles[1].style
  );

  return (
    <div className="grid grid-cols-4 gap-1 max-w-fit">
      {/* Champ Icon */}
      <div className="col-span-2 relative h-13 w-13">
        <Image
          src={champIconUrl}
          width={52}
          height={52}
          alt={myParticipant.championName}
        />
        <span className="text-xs font-medium absolute right-0 bottom-0 bg-accent px-0.5">
          {champLevel}
        </span>
      </div>

      {/* Summoner Spells */}
      <div className="col-span-1 flex flex-col gap-1">
        {SummonerSpellIcon(summoner1Data, summoner1Icon)}
        {SummonerSpellIcon(summoner2Data, summoner2Icon)}
      </div>

      {/* Runes */}
      {keyStoneIcon && subStyleIcon ? (
        <div className="col-span-1 flex flex-col gap-1">
          {RuneIcon(keyStoneData, keyStoneIcon)}
          {RuneIcon(subStyleData, subStyleIcon)}
        </div>
      ) : null}
    </div>
  );
}
