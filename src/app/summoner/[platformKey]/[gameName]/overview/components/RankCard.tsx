import { calculateWinrate } from "@/helper/stats/stats";
import { toNormalCase, toRoman } from "@/utils/utils";
import { RankedData } from "@/types/summoner";
import Image from "next/image";
import { getRankData } from "@/helper/summoner";

export default function RankCard({
  data,
  rankType,
}: {
  data: RankedData[];
  rankType: "Ranked Solo" | "Ranked Flex";
}) {
  const rankedData = getRankData(data, rankType);
  const wins = rankedData?.wins ?? 0;
  const losses = rankedData?.losses ?? 0;
  const leaguePoints = rankedData?.leaguePoints;
  const winrate = calculateWinrate(wins, losses);
  const tier = data ? toNormalCase(rankedData?.tier) : ""; //The actual rank like Diamond
  const rank = data ? toRoman(rankedData?.rank, tier) : ""; //The division like Diamond 1

  const hasRankInfo = !!rank || !!tier;

  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <div className={`relative ${hasRankInfo && "space-y-4"}`}>
        <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
          {rankType}
        </h2>

        {hasRankInfo ? (
          <div className="flex items-center justify-between ">
            <div className="flex gap-4">
              <Image
                src={`/Ranked_Emblems/Rank=${tier}.png`}
                alt="rank"
                width={50}
                height={50}
                className="border-2 rounded-md"
              />

              <div className="flex flex-col justify-center">
                <span className="font-semibold text-lg space-x-1.5">
                  <span>{tier}</span>
                  <span>{rank}</span>
                </span>

                <span className="text-xs font-semibold text-subtle">
                  {leaguePoints} LP
                </span>
              </div>
            </div>

            <div className="flex flex-col font-semibold items-end text-xs text-subtle space-y-1">
              <span>
                {wins}W {losses}L
              </span>
              <span> {winrate}% Win Rate</span>
            </div>
          </div>
        ) : (
          <span className="text-subtle text-sm absolute right-0 top-1/2 -translate-y-1/2">
            Unranked
          </span>
        )}
      </div>
    </section>
  );
}
