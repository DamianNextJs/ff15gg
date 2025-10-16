import { queueMap } from "@/lib/maps/queueMap";
import { MatchData } from "@/types/match";
import {
  calculateKDA,
  calculateWinrate,
  getRoleFromIndex,
} from "@/features/profilepage/utils/stats";
import { RecentChampStats, RecentStats, RoleType } from "@/types/summoner";

export function getRecentStats(
  matches: MatchData[],
  myPuuid: string
): RecentStats {
  let wins = 0;
  let losses = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  const roleCount: Record<RoleType, number> = {
    Top: 0,
    Jungle: 0,
    Mid: 0,
    Bot: 0,
    Support: 0,
    Unknown: 0,
  };

  const champMap: Record<number, RecentChampStats> = {};

  for (const match of matches) {
    const participant = match.info.participants.find(
      (p) => p.puuid === myPuuid
    );
    if (!participant) continue;

    const queue = queueMap[match.info.queueId];

    // Overall totals
    wins += participant.win ? 1 : 0;
    losses += participant.win ? 0 : 1;
    kills += participant.kills;
    deaths += participant.deaths;
    assists += participant.assists;

    // Role Tracking (ignore ARAM)
    if (queue !== "ARAM") {
      const role = getRoleFromIndex(
        match.info.participants.findIndex((p) => p.puuid === myPuuid)
      );
      roleCount[role]++;
    }

    // Champion aggregation
    const champId = participant.championId;
    if (!champMap[champId]) {
      champMap[champId] = {
        champId,
        games: 0,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        winRate: 0,
        kda: 0,
      };
    }

    const champStats = champMap[champId];
    champStats.games++;
    champStats.wins += participant.win ? 1 : 0;
    champStats.losses += participant.win ? 0 : 1;
    champStats.kills += participant.kills;
    champStats.deaths += participant.deaths;
    champStats.assists += participant.assists;
  }

  // Post-calculation: derive KDA & winrate for each champion
  const champStatsArr = Object.values(champMap).map((c) => ({
    ...c,
    winRate: calculateWinrate(c.wins, c.losses),
    kda: calculateKDA(c.kills, c.deaths, c.assists),
  }));

  // Most played champion
  const mostPlayedChampion =
    champStatsArr.sort((a, b) => b.games - a.games)[0] || null;

  // Most played role
  const totalRoleGames = Object.values(roleCount).reduce((a, b) => a + b, 0);
  const mostPlayedRole: { role: RoleType; percentage: number } = {
    role: "Unknown",
    percentage: 0,
  };

  for (const [role, count] of Object.entries(roleCount)) {
    if (count > roleCount[mostPlayedRole.role]) {
      mostPlayedRole.role = role as RoleType;
    }
  }
  mostPlayedRole.percentage = totalRoleGames
    ? Math.round((roleCount[mostPlayedRole.role] / totalRoleGames) * 100)
    : 0;

  const gamesPlayed = wins + losses;
  const kda = calculateKDA(kills, deaths, assists);
  const winRate = calculateWinrate(wins, losses);

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
