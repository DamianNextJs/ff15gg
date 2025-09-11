"use client";

import Image from "next/image";
import { CachedSummoner } from "@/types/riot";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { DDragon } from "@/helper/utils/ddragon";

interface SuggestionItemProps {
  summoner: CachedSummoner;
  region: RegionKey;
  onSelect: (summoner: CachedSummoner) => void;
}

export default function SuggestionItem({
  summoner,
  region,
  onSelect,
}: SuggestionItemProps) {
  const profileIcon = DDragon.profileIcon(summoner.profileIconId);

  return (
    <li
      className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center rounded-md"
      onClick={() => onSelect(summoner)}
    >
      <div className="flex items-center gap-1.5">
        <Image src={profileIcon} alt="icon" width={25} height={25} />
        <span className="text-sm lg:text-base">
          {summoner.gameName} #{summoner.tagLine}
        </span>
        <span className="text-xs lg:text-sm opacity-50">
          Lvl {summoner.summonerLevel}
        </span>
      </div>
      <span
        className={`${regionMap[region].color} text-xs p-1 rounded-xs w-10 text-center text-white font-bold`}
      >
        {regionMap[region].label}
      </span>
    </li>
  );
}
