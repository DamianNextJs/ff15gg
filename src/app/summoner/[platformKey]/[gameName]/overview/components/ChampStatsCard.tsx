"use client";
import { calculateAverageStats } from "@/helper/stats/stats";
import Image from "next/image";
import { ChampStats } from "@/types/summoner";
import { DDragon } from "@/utils/ddragon";
import { getChampionById } from "@/helper/getChampionById";
import SectionHeading from "@/components/SectionHeading";
import QueueSelector from "./MatchHistoryComponents/QueueSelector";
import { useState } from "react";
import { queueMap } from "@/lib/maps/queueMap";
import { mergeChampionStats } from "@/helper/stats/mergeChampionStats";

export default function ChampStatsCard({
  championStats,
}: {
  championStats: ChampStats[];
}) {
  const [currentQueue, setCurrentQueue] = useState<number | "all">("all");

  const displayedStats =
    currentQueue === "all"
      ? mergeChampionStats(championStats)
      : mergeChampionStats(
          championStats.filter(
            (s) => s.queue === queueMap[Number(currentQueue)]
          )
        );

  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <div className="flex items-center justify-between">
        <SectionHeading text="Champion Stats" />
        <QueueSelector
          currentQueue={currentQueue}
          setCurrentQueue={setCurrentQueue}
        />
      </div>
      {displayedStats.length > 0 ? (
        displayedStats.slice(0, 5).map((champStats: ChampStats) => {
          const champ = getChampionById(champStats.champId);
          if (!champ) return null;
          // skip if champion not found

          const champIcon = DDragon.championIcon(champ.id);
          const { averageKills, averageDeaths, averageAssists } =
            calculateAverageStats(
              champStats.kills,
              champStats.deaths,
              champStats.assists,
              champStats.games
            );

          return (
            <div
              className="mt-3 grid grid-cols-[2fr_1fr_1fr] border-t border-accent -mx-4 px-4 pt-2 font-medium text-xs  text-center"
              key={`${champStats.champId}-${champStats.queue}-${champStats.role}`}
            >
              {/* Champ Icon + name */}
              <div className="flex gap-2 items-center">
                <Image
                  src={`${champIcon}`}
                  alt="champion icon"
                  width={35}
                  height={35}
                />
                <p className="font-semibold lg:text-sm text-left">
                  {champ.name}
                </p>
              </div>

              {/* stats container */}
              <div>
                <p className="font-semibold">{champStats.kda} KDA</p>
                <p className="text-subtle text-nowrap">
                  {averageKills} <span className="text-subtle/50">/</span>{" "}
                  {averageDeaths} <span className="text-subtle/50">/</span>{" "}
                  {averageAssists}
                </p>
              </div>

              {/* games amount and winrate */}
              <div className="text-right">
                <p>{champStats.winRate}%</p>
                <p className="text-subtle">{champStats.games} games</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-subtle text-sm border-t border-accent -mx-4 px-4 text-center mt-3 pt-9 pb-5">
          No {queueMap[Number(currentQueue)]} games played.
        </div>
      )}
    </section>
  );
}
