"use client";

import { ChampStats } from "@/types/summoner";
import SectionHeading from "@/components/SectionHeading";
import { useState } from "react";
import { queueMap } from "@/lib/maps/queueMap";
import QueueSelector from "@/features/shared/dropdowns//components/QueueSelector";
import { calculateAverageStats } from "../../utils/stats";
import { mergeChampionStats } from "../../utils/mergeChampionStats";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";

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
    <section className="mt-3 bg-secondary rounded-md p-4 pb-0">
      <div className="flex items-center justify-between">
        <SectionHeading>Champion Stats</SectionHeading>
        <QueueSelector
          currentQueue={currentQueue}
          setCurrentQueue={setCurrentQueue}
        />
      </div>
      <div className="mt-3">
        {displayedStats.length > 0 ? (
          displayedStats.slice(0, 5).map((champStats: ChampStats) => {
            // skip if champion not found

            const { averageKills, averageDeaths, averageAssists } =
              calculateAverageStats(
                champStats.kills,
                champStats.deaths,
                champStats.assists,
                champStats.games
              );

            return (
              <div
                className="grid grid-cols-[2fr_1fr_1fr] items-center border-t border-accent -mx-4 px-4 py-2 font-medium text-xs text-center"
                key={`${champStats.champId}-${champStats.queue}-${champStats.role}`}
              >
                {/* Champ Icon + name */}
                <div className="flex gap-2 items-center">
                  <ChampionIcon championId={champStats.champId} size={"md"} />
                  <p className="font-semibold lg:text-sm text-left">
                    {champStats.champName}
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
          <div className="text-subtle text-sm border-t border-accent -mx-4 px-4 text-center mt-3 py-10">
            No {queueMap[Number(currentQueue)]} games played.
          </div>
        )}
      </div>
    </section>
  );
}
