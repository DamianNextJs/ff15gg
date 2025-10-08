import { calculateAverageStats, calculateWinrate } from "@/helper/stats/stats";
import { calculateKDA } from "@/helper/stats/stats";
import Image from "next/image";
import { ChampStats } from "@/types/summoner";
import { DDragon } from "@/utils/ddragon";
import { getChampionById } from "@/helper/getChampionById";
import SectionHeading from "@/components/SectionHeading";

export default function ChampStatsCard({
  recentChampStats,
}: {
  recentChampStats: ChampStats[];
}) {
  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <SectionHeading text="Champion Stats" />
      {(recentChampStats || []).map((champStats: ChampStats) => {
        const champ = getChampionById(champStats.champId);
        if (!champ) return null; // skip if champion not found

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
            key={champStats.champId}
          >
            {/* Champ Icon + name */}
            <div className="flex gap-2 items-center">
              <Image
                src={`${champIcon}`}
                alt="champion icon"
                width={35}
                height={35}
              />
              <p className="font-semibold lg:text-sm text-left">{champ.name}</p>
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
      })}
    </section>
  );
}
