import { queueMap } from "@/lib/maps/queueMap";
import { MatchData } from "@/types/match";
import { calculateKDA, calculateWinrate } from "./stats";
import { ChampStats, RecentStats } from "@/types/summoner";
import { calculateChampionStats } from "./calculateChampionStats";

export function getRecentStats(
  matches: MatchData[],
  myPuuid: string
): RecentStats {
  let wins = 0;
  let losses = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  const roleCount: Record<string, number> = {};

  for (const match of matches) {
    const participant = match.info.participants.find(
      (p) => p.puuid === myPuuid
    );
    if (!participant) continue;

    // Overall totals
    if (participant.win) wins++;
    else losses++;

    kills += participant.kills;
    deaths += participant.deaths;
    assists += participant.assists;

    // Role tracking (non-ARAM)
    const queueId = match.info.queueId;
    if (queueMap[queueId] !== "ARAM") {
      const index = match.info.participants.findIndex(
        (p) => p.puuid === myPuuid
      );
      const role = getRoleFromIndex(index);
      roleCount[role] = (roleCount[role] || 0) + 1;
    }
  }

  const gamesPlayed = wins + losses;
  const kda = calculateKDA(kills, deaths, assists);
  const winRate = calculateWinrate(wins, losses);

  // --- Most played champion ---
  const champStats: ChampStats[] | null = calculateChampionStats(
    matches,
    myPuuid
  );
  const mostPlayedChampion: ChampStats | null =
    (champStats && champStats[0]) || null;

  // --- Most played role ---
  let mostPlayedRole = { role: "Unknown", percentage: 0 };
  let totalRoleGames = 0;

  for (const count of Object.values(roleCount)) {
    totalRoleGames += count;
  }

  for (const [role, count] of Object.entries(roleCount)) {
    const percentage = Math.round((count / totalRoleGames) * 100);
    if (count > mostPlayedRole.percentage) {
      mostPlayedRole = { role, percentage };
    }
  }

  return {
    wins,
    losses,
    kills,
    deaths,
    assists,
    gamesPlayed,
    winRate,
    kda,
    mostPlayedChampion,
    mostPlayedRole,
  };
}

function getRoleFromIndex(index: number): string {
  const roleOrder = ["Top", "Jungle", "Mid", "Bot", "Support"];
  const teamIndex = index % 5;
  return roleOrder[teamIndex] || "Unknown";
}
