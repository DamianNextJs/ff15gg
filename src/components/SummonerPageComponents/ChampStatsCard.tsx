import { calculateWinrate } from "@/helper";
import { calculateKDA } from "@/helper";
import { getChampionById } from "@/helper/champion/getChampionById";
import { Key } from "react";
import Image from "next/image";
import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { ChampStats } from "@/types/riot";

export default function ChampStatsCard({
  recentChampStats,
}: {
  recentChampStats: ChampStats[];
}) {
  const version = useLatestDDragonVersion();
  const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;

  return (
    <section className="mt-3 w-full bg-secondary rounded-md p-4">
      <h2 className="text-sm md:text-lg font-bold border-l-2 border-primary m-0 ps-3">
        Champion Stats
      </h2>
      {recentChampStats &&
        recentChampStats.map((champStats: ChampStats, key: Key) => {
          const champ = getChampionById(champStats.champId);
          const winRate = calculateWinrate(champStats.wins, champStats.losses);
          const kda = calculateKDA(
            champStats.kills,
            champStats.assists,
            champStats.deaths
          );
          return (
            <div
              className="mt-3 grid grid-cols-[2fr_1fr_1fr] border-t border-accent -mx-4 px-4 pt-2 font-bold text-xs md:text-sm text-center"
              key={key}
            >
              {/* Champ Icon + name */}
              <div className="flex gap-2 items-center">
                <Image
                  src={`${champIconUrl}${champ.image.full}`}
                  alt="champion icon"
                  width={35}
                  height={35}
                />
                <p>{champ.name}</p>
              </div>

              {/* stats container */}
              <div>
                <p>{kda} KDA</p>
                <p className="text-subtle">
                  {champStats.kills} <span className="text-subtle/50">/</span>{" "}
                  {champStats.deaths} <span className="text-subtle/50">/</span>{" "}
                  {champStats.assists}
                </p>
              </div>

              {/* games amount and winrate */}
              <div className="text-right">
                <p>{winRate}%</p>
                <p className="text-subtle">{champStats.games} games</p>
              </div>
            </div>
          );
        })}
    </section>
  );
}
