"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type RegionKey } from "@/lib/regionMap";
import RegionSelect from "./RegionSelect";
import { normalizeSummonerName } from "@/helper";
import SearchSuggestions from "./SearchSuggestions";

export default function SummonerSearch() {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState<RegionKey>("euw");

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const [name, tag] = summonerName.split("#");

    if (!name || !tag) {
      return;
    }

    const { gameName, tagLine } = normalizeSummonerName(name, tag);

    router.push(
      `/summoner/${region}/${encodeURIComponent(`${gameName}#${tagLine}`)}`
    );
  };

  return (
    <div className="relative w-full lg:w-1/2 text-secondary">
      <form
        className="flex justify-between items-center bg-white p-5 rounded-md mx-auto lg:text-xl"
        onSubmit={handleSearch}
      >
        <input
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          placeholder="Enter Riot ID"
          className="focus:outline-none w-full"
        />
        <RegionSelect value={region} onChange={setRegion} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7  ms-3 cursor-pointer"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </form>
      <SearchSuggestions summonerName={summonerName} region={region} />
    </div>
  );
}
