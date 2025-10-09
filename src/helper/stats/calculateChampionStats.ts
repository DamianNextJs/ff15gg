import { ChampStats } from "@/types/summoner";
import { MatchData } from "@/types/match";
import { calculateKDA, calculateWinrate, getRoleFromIndex } from "./stats";
import { queueMap } from "@/lib/maps/queueMap";

export function calculateChampionStats(
  matches: MatchData[],
  summonerPuuid: string
): ChampStats[] {
  if (!matches || matches.length === 0) return [];

  const statsMap: Record<string, ChampStats> = {};

  for (const match of matches) {
    const participant = match.info.participants.find(
      (p) => p.puuid === summonerPuuid
    );
    if (!participant) continue;

    const champId = participant.championId;
    const queue = queueMap[match.info.queueId];
    const role =
      queue !== "ARAM"
        ? getRoleFromIndex(
            match.info.participants.findIndex((p) => p.puuid === summonerPuuid)
          )
        : "Unknown";

    const key = `${champId}-${role}-${queue}`;

    if (!statsMap[key]) {
      statsMap[key] = {
        champId,
        games: 0,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        winRate: 0,
        kda: 0,
        maxKills: 0,
        maxDeaths: 0,
        CS: 0,
        damage: 0,
        gold: 0,
        doubleKills: 0,
        trippleKills: 0,
        quadraKills: 0,
        pentaKills: 0,
        role,
        queue,
      };
    }

    const stats = statsMap[key];

    // Aggregate totals
    stats.games++;
    stats.wins += participant.win ? 1 : 0;
    stats.losses += participant.win ? 0 : 1;
    stats.kills += participant.kills;
    stats.deaths += participant.deaths;
    stats.assists += participant.assists;

    // Aggregate additional stats
    stats.maxKills = Math.max(stats.maxKills ?? 0, participant.kills);
    stats.maxDeaths = Math.max(stats.maxDeaths ?? 0, participant.deaths);
    stats.CS +=
      participant.totalMinionsKilled + participant.neutralMinionsKilled;
    stats.damage += participant.totalDamageDealtToChampions ?? 0;
    stats.gold += participant.goldEarned ?? 0;

    stats.doubleKills += participant.doubleKills;
    stats.trippleKills += participant.tripleKills;
    stats.quadraKills += participant.quadraKills;
    stats.pentaKills += participant.pentaKills;
  }

  // Post-calculation: derive KDA & win rate

  for (const stats of Object.values(statsMap)) {
    stats.winRate = calculateWinrate(stats.wins, stats.losses);
    stats.kda = calculateKDA(stats.kills, stats.deaths, stats.assists);
  }

  return Object.values(statsMap).sort((a, b) => b.games - a.games);
}
