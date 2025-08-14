"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type RegionKey } from "@/lib/region";
import RegionSelect from "./RegionSelect";

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

    router.push(
      `/summoner/${region}/${encodeURIComponent(summonerName.trim())}`
    );
  };

  return (
    <form
      className="w-full flex justify-between items-center bg-white text-secondary p-5  lg:w-1/2 rounded-md  "
      onSubmit={handleSearch}
    >
      <input
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        placeholder="Enter Riot ID"
        className="focus:outline-none w-full"
      />
      <RegionSelect value={region} onChange={setRegion} />
    </form>
  );
}
