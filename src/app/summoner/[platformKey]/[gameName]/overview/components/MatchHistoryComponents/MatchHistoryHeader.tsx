import WinRateDonut from "@/components/WinRateDonut";
import { RecentStats } from "@/types/summoner";
import {
  calculateAverageStats,
  calculateWinrate,
  calculateKDA,
} from "@/helper/stats/stats";

interface MatchHistoryHeaderProps {
  recentStats: RecentStats;
}

export default function MatchHistoryHeader({
  recentStats,
}: MatchHistoryHeaderProps) {
  const { wins, losses, kills, deaths, assists, gamesPlayed } = recentStats;

  // --- Safely calculate averages ---
  const safeGames = gamesPlayed || 1;
  const { averageKills, averageDeaths, averageAssists } = calculateAverageStats(
    kills,
    deaths,
    assists,
    safeGames
  );

  const winRate = calculateWinrate(wins, losses);
  const KDA = calculateKDA(kills, deaths, assists);

  return (
    <div className="-mx-4 px-4 py-3 bg-accent/75 mt-4 flex items-center gap-5">
      <WinRateDonut winRate={winRate} size={30} strokeWidth={7} />

      <div className="flex flex-col w-25">
        <span className="text-sm lg:text-base font-semibold">
          {winRate}% WR
        </span>
        <span className="text-xs lg:text-sm text-subtle">
          Last {gamesPlayed} Games
        </span>
      </div>

      <div className="flex flex-col text-center w-25">
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
