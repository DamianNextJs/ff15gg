"use client";
import Image from "next/image";
import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { useCachedSummoners } from "@/hooks/useCachedSummoners";
import { CachedSummoner } from "@/types/riot";
import { Key, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RegionKey, regionMap, platformToRegionKey } from "@/lib/region";

export default function SearchSuggestions({
  summonerName,
  region,
}: {
  summonerName: string;
  region: RegionKey;
}) {
  const version = useLatestDDragonVersion();
  const { results } = useCachedSummoners(summonerName, region);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLUListElement>(null);

  //close suggestions if click happens outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (summonerName) setOpen(true);
  }, [summonerName]);

  const handleSelectSuggestion = (summoner: CachedSummoner) => {
    router.push(
      `/summoner/${region}/${encodeURIComponent(
        `${summoner.gameName}#${summoner.tagLine}`
      )}`
    );
  };

  if (!results.length || !open) return null;

  return (
    <ul
      ref={ref}
      className="absolute top-full mt-1 w-full bg-white border z-10 rounded-md overflow-hidden"
    >
      <h2 className="bg-subtle text-xs p-2">Summoner Profile</h2>
      {results.map((suggestion: CachedSummoner, key: Key) => (
        <li
          key={key}
          className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          <div className="flex items-center gap-2">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${suggestion.profileIconId}.png`}
              alt="icon"
              width={25}
              height={25}
            />
            <span className="text-sm sm:text-base font-medium">
              {suggestion.gameName} #{suggestion.tagLine}
            </span>
            <span className="text-xs ">Lvl {suggestion.summonerLevel}</span>
          </div>
          <span
            className={`${regionMap[region].color} text-xs p-0.5 w-10 text-center rounded-xs text-white font-bold`}
          >
            {regionMap[platformToRegionKey[suggestion.region]].label}
          </span>
        </li>
      ))}
    </ul>
  );
}
