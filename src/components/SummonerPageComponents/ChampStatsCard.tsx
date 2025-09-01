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
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
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
              className="mt-3 grid grid-cols-[2fr_1fr_1fr] border-t border-accent -mx-4 px-4 pt-2 font-medium text-xs lg:text-sm text-center"
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
                <p className="font-semibold">{champ.name}</p>
              </div>

              {/* stats container */}
              <div>
                <p className="font-semibold">{kda} KDA</p>
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
