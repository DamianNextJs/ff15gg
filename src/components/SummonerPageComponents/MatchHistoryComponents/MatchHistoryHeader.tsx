import WinRateDonut from "@/components/UI/WinRateDonut";
import { MatchData } from "@/types/riot";

import {
  calculateAverageStats,
  calculateKDA,
  calculateWinrate,
  getRecentStats,
} from "@/helper";

export default function MatchHistoryHeader({
  matches,
  puuid,
}: {
  matches: MatchData[];
  puuid: string;
}) {
  const { wins, losses, kills, assists, deaths, gamesPlayed } = getRecentStats(
    matches,
    puuid
  );
  const { averageKills, averageDeaths, averageAssists } = calculateAverageStats(
    kills,
    deaths,
    assists,
    gamesPlayed
  );
  const winRate = calculateWinrate(wins, losses);
  const KDA = calculateKDA(kills, deaths, assists);
  return (
    <div className="-mx-4 px-4 py-3 bg-accent mt-3 flex items-center gap-5">
      <WinRateDonut winRate={winRate} size={30} strokeWidth={7} />
      <div className="flex flex-col">
        <span className="text-sm lg:text-base font-semibold">
          {winRate}% WR
        </span>
        <span className="text-xs lg:text-sm text-subtle">
          Last {gamesPlayed} Games
        </span>
      </div>
      <div className="flex flex-col text-center">
        <span className="text-sm lg:text-base font-semibold">{KDA} KDA</span>
        <span className="text-xs lg:text-sm text-subtle">
          {averageKills} <span className="text-subtle/50">/</span>{" "}
          {averageDeaths} <span className="text-subtle/50">/</span>{" "}
          {averageAssists}
        </span>
      </div>
    </div>
  );
}
