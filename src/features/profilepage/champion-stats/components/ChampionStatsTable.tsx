"use client";
import { ChampStats, ChampStatsWithAvg } from "@/types/summoner";
import ChampionStatsFilters from "./ChampionStatsFilters";
import { useEffect, useState } from "react";
import { RoleType } from "@/types/summoner";
import ChampionStatsHeader from "./ChampionStatsHeader";

import { queueMap } from "@/lib/maps/queueMap";
import ChampionStatsRow from "./ChampionStatsRow";
import { roleMap } from "@/lib/maps/roleMap";
import { mergeChampionStats } from "../../utils/mergeChampionStats";
import { calculateAverageStats } from "../../utils/stats";

export type SortableChampionStats =
  | "#"
  | "Champion"
  | "WinRate"
  | "KDA"
  | "MaxKills"
  | "MaxDeaths"
  | "CS"
  | "Damage"
  | "Gold"
  | "Vision"
  | "Double"
  | "Triple"
  | "Quadra"
  | "Penta";

export default function ChampionStatsTable({
  championStats,
}: {
  championStats: ChampStats[];
}) {
  const [currentQueue, setCurrentQueue] = useState<number | "all">("all");
  const [currentRole, setCurrentRole] = useState<RoleType | "all">("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortableChampionStats | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    // reset role when ARAM is selected
    if (currentQueue === 450) {
      setCurrentRole("all");
    }
  }, [currentQueue]);

  let filteredStats: ChampStats[];

  if (currentQueue === "all" && currentRole === "all") {
    filteredStats = mergeChampionStats(championStats);
  } else if (currentQueue === "all") {
    filteredStats = mergeChampionStats(
      championStats.filter((s) => s.role === currentRole)
    );
  } else if (currentRole === "all") {
    filteredStats = mergeChampionStats(
      championStats.filter((s) => s.queue === queueMap[Number(currentQueue)])
    );
  } else {
    filteredStats = championStats.filter(
      (s) =>
        s.queue === queueMap[Number(currentQueue)] && s.role === currentRole
    );
  }

  if (searchFilter) {
    const normalizedSearch = searchFilter.trim().toLowerCase();

    filteredStats = filteredStats.filter((stats) =>
      stats.champName.toLowerCase().includes(normalizedSearch)
    );
  }

  const statsWithAvg: ChampStatsWithAvg[] = filteredStats.map((stat) => {
    const avg = calculateAverageStats(
      stat.kills,
      stat.deaths,
      stat.assists,
      stat.games,
      stat.CS,
      stat.csPerMin,
      stat.damage,
      stat.gold,
      stat.vision
    );
    return { ...stat, ...avg };
  });

  if (sortBy) {
    statsWithAvg.sort((a, b) => {
      let result = 0;
      switch (sortBy) {
        case "#":
          result = b.games - a.games;
          break;

        case "Champion":
          result = a.champName.localeCompare(b.champName);
          break;

        case "WinRate":
          result = b.winRate - a.winRate;
          break;

        case "KDA":
          result = b.kda - a.kda;
          break;

        case "MaxKills":
          result = b.maxKills - a.maxKills;
          break;

        case "MaxDeaths":
          result = b.maxDeaths - a.maxDeaths;
          break;

        case "CS":
          result = b.averageCS - a.averageCS;
          break;

        case "Damage":
          result = b.averageDamage - a.averageDamage;
          break;

        case "Gold":
          result = b.averageGold - a.averageGold;
          break;

        case "Vision":
          result = b.averageVision - a.averageVision;
          break;

        case "Double":
          result = b.doubleKills - a.doubleKills;
          break;

        case "Triple":
          result = b.tripleKills - a.tripleKills;
          break;

        case "Quadra":
          result = b.quadraKills - a.quadraKills;
          break;

        case "Penta":
          result = b.pentaKills - a.pentaKills;
          break;

        default:
          return 0;
      }

      return sortDirection === "asc" ? -result : result;
    });
  }

  return (
    <div className="-mt-1 bg-secondary rounded-md">
      <ChampionStatsFilters
        currentQueue={currentQueue}
        setCurrentQueue={setCurrentQueue}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <ChampionStatsHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <div>
        {statsWithAvg.length > 0 ? (
          statsWithAvg.map((stat, i) => (
            <ChampionStatsRow
              stat={stat}
              key={i}
              index={i}
              isLast={i === statsWithAvg.length - 1}
              sortBy={sortBy}
            />
          ))
        ) : (
          <div className="p-10 border-t border-accent text-subtle text-sm flex flex-col lg:flex-row items-center justify-center gap-2 ">
            No {queueMap[Number(currentQueue)]} games found for{" "}
            {currentRole === "all"
              ? "all lanes"
              : roleMap[currentRole as RoleType].label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
