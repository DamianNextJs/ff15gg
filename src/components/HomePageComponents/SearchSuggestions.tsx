"use client";
import Image from "next/image";
import { useCachedSummoners } from "@/hooks/useCachedSummoners";
import { CachedSummoner } from "@/types/riot";
import { Key, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RegionKey, regionMap, platformToRegionKey } from "@/lib/regionMap";
import { useVersion } from "@/context/VersionContext";
import LoadingIndicator from "./LoadingIndicator";

export default function SearchSuggestions({
  summonerName,
  region,
}: {
  summonerName: string;
  region: RegionKey;
}) {
  const version = useVersion();
  const { results, loading } = useCachedSummoners(summonerName, region);
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

  if (loading) return <LoadingIndicator />;

  if (!results.length || !open) return null;

  return (
    <ul
      ref={ref}
      className="absolute mt-1 w-full bg-white border z-10 rounded-md"
    >
      <h2 className="bg-subtle text-xs lg:text-sm p-2 rounded-t-md">
        Summoner Profile
      </h2>
      {results.map((suggestion: CachedSummoner, key: Key) => (
        <li
          key={key}
          className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center rounded-md"
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          <div className="flex items-center gap-1.5">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${suggestion.profileIconId}.png`}
              alt="icon"
              width={25}
              height={25}
            />
            <span className="text-sm lg:text-base">
              {suggestion.gameName} #{suggestion.tagLine}
            </span>
            <span className="text-xs lg:text-sm opacity-50">
              Lvl {suggestion.summonerLevel}
            </span>
          </div>
          <span
            className={`${regionMap[region].color} text-xs p-1 rounded-xs w-10 text-center text-white font-bold`}
          >
            {regionMap[platformToRegionKey[suggestion.region]].label}
          </span>
        </li>
      ))}
    </ul>
  );
}
