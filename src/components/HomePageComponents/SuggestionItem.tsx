"use client";

import Image from "next/image";
import { CachedSummoner } from "@/types/riot";
import { regionMap, type RegionKey } from "@/lib/maps/regionMap";
import { DDragon } from "@/helper/utils/ddragon";

interface SuggestionItemProps {
  summoner: CachedSummoner;
  onSelect: (summoner: CachedSummoner) => void;
}

export default function SuggestionItem({
  summoner,
  onSelect,
}: SuggestionItemProps) {
  const profileIcon = DDragon.profileIcon(summoner.profileIconId);

  // Ensure summoner.region is typed as a valid RegionKey
  const regionKey = summoner.region as RegionKey;

  return (
    <li
      className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center rounded-md"
      onClick={() => onSelect(summoner)}
    >
      <div className="flex items-center gap-1.5">
        <Image src={profileIcon} alt="icon" width={25} height={25} />
        <span className="text-sm lg:text-base">
          {summoner.gameName} #{summoner.tagLine.toUpperCase()}
        </span>
        <span className="text-xs lg:text-sm opacity-50">
          Lvl {summoner.summonerLevel}
        </span>
      </div>
      <span
        className={`${regionMap[regionKey].color} text-xs p-1 rounded-xs w-10 text-center text-white font-bold`}
      >
        {regionMap[regionKey].label}
      </span>
    </li>
  );
}
