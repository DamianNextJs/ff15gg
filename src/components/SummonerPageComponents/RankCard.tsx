import { calculateWinrate } from "@/helper/calculateWinrate";
import { toNormalCase } from "@/helper/toNormalCase";
import { toRoman } from "@/helper/toRoman";

export default function RankCard({
  data,
  rankType,
}: {
  data: any;
  rankType: string;
}) {
  const wins = data?.wins;
  const losses = data?.losses;
  const leaguePoints = data?.leaguePoints;
  const winrate = calculateWinrate(wins, losses);
  const tier = toNormalCase(data?.tier); //The actual rank like Diamond
  const rank = toRoman(data?.rank, tier); //The division like Diamond 1

  const hasRankInfo = rank || tier;

  return (
    <section className="mt-3 w-full bg-secondary rounded-md p-4">
      <div className={`relative ${hasRankInfo && "space-y-4"}`}>
        <h2 className="text-sm font-semibold border-l-2 border-primary ps-3 ">
          {rankType}
        </h2>

        {hasRankInfo ? (
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <img
                src={`/Ranked_Emblems/Rank=${tier}.png`}
                alt="rank"
                className="size-15"
              />
              <div className="flex flex-col justify-center">
                <span className="font-bold text-lg space-x-1.5">
                  <span>{tier}</span>
                  <span>{rank}</span>
                </span>

                <span className="text-xs text-subtle">{leaguePoints} LP</span>
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-subtle space-y-1">
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
