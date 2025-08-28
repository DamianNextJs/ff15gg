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
      <div className="">
        <h2 className="text-sm font-semibold border-l-2 border-primary m-0 ps-3">
          Champion Stats
        </h2>
        {recentChampStats &&
          recentChampStats.map((champStats: ChampStats, key: Key) => {
            const champ = getChampionById(champStats.champId);
            const winRate = calculateWinrate(
              champStats.wins,
              champStats.losses
            );
            const kda = calculateKDA(
              champStats.kills,
              champStats.assists,
              champStats.deaths
            );
            return (
              <div
                className="mt-3 flex justify-between border-t border-accent pt-2"
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
                <div className="flex justify-between  w-1/2 text-xs">
                  {/* KDA */}
                  <div className="flex flex-col items-center  w-1/2">
                    <p className="font-semibold">{kda} KDA</p>
                    <p>
                      {champStats.kills} <span className="text-subtle">/</span>{" "}
                      {champStats.deaths} <span className="text-subtle">/</span>{" "}
                      {champStats.assists}
                    </p>
                  </div>
                  {/* games amount and winrate */}
                  <div className="flex flex-col items-end  w-1/2">
                    <p className="font-semibold">{winRate}%</p>
                    <p>{champStats.games} games</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
