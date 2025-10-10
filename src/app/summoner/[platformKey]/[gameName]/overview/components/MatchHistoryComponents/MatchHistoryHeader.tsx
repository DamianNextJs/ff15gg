import WinRateDonut from "@/components/WinRateDonut";
import { RecentStats } from "@/types/summoner";
import { calculateAverageStats } from "@/helper/stats/stats";
import { getChampionById } from "@/helper/getChampionById";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import Tooltip from "@/components/Tooltip";

export default function MatchHistoryHeader({
  recentStats,
}: {
  recentStats: RecentStats;
}) {
  const {
    winRate,
    kda,
    kills,
    deaths,
    assists,
    gamesPlayed,
    mostPlayedChampion,
    mostPlayedRole,
  } = recentStats;

  // --- Safely calculate averages ---
  const safeGames = gamesPlayed || 1;
  const { averageKills, averageDeaths, averageAssists } = calculateAverageStats(
    kills,
    deaths,
    assists,
    safeGames
  );

  const champ =
    mostPlayedChampion && getChampionById(mostPlayedChampion.champId);

  const champIcon = DDragon.championIcon(champ?.id ?? "");

  return (
    <div className="-mx-4 px-4 py-3 bg-accent/75 mt-4 grid grid-cols-2 lg:grid-cols-4 items-center justify-items-center">
      {/* --- Winrate --- */}
      <div className="flex items-center gap-4 w-36">
        <WinRateDonut winRate={winRate} size={30} strokeWidth={7} />

        <div className="flex flex-col">
          <span className="text-sm lg:text-base font-semibold">
            {winRate}% WR
          </span>
          <span className="text-xs lg:text-sm text-subtle">
            Last {gamesPlayed} Games
          </span>
        </div>
      </div>

      {/* --- Stats --- */}
      <div className="flex flex-col text-center w-30">
        <span className="text-sm lg:text-base font-semibold">{kda} KDA</span>
        <span className="text-xs lg:text-sm text-subtle">
          {averageKills} <span className="text-subtle/50">/</span>{" "}
          {averageDeaths} <span className="text-subtle/50">/</span>{" "}
          {averageAssists}
        </span>
      </div>

      {/* --- Most Played Champion --- */}
      {mostPlayedChampion && (
        <div className="hidden lg:flex gap-2 w-35">
          <Image src={champIcon} width={40} height={40} alt="champ icon" />
          <div className="text-xs flex flex-col justify-between font-medium">
            <div className="flex gap-1">
              {mostPlayedChampion.winRate}%
              <p className="text-subtle">
                ({mostPlayedChampion.wins}W {mostPlayedChampion.losses}L)
              </p>
            </div>
            <div>{mostPlayedChampion.kda} KDA</div>
          </div>
        </div>
      )}

      {/* --- Most Played Role --- */}
      {mostPlayedRole.role !== "Unknown" && (
        <div className="hidden lg:flex items-center gap-2">
          <Tooltip content={<p className="text-sm">Preferred Role</p>}>
            <Image
              src={`/Role_Icons/Role=${mostPlayedRole.role}.png`}
              width={20}
              height={20}
              alt="role icon"
            />
          </Tooltip>
          <div className="h-1.5 bg-primary/25 rounded-md overflow-hidden w-25">
            <div
              className={`$ bg-primary h-full`}
              style={{
                width: `${mostPlayedRole.percentage}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
