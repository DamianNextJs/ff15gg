import { ChampStats } from "@/types/summoner";
import { MatchData } from "@/types/match";
import {
  calculateCSPerMin,
  calculateKDA,
  calculateWinrate,
  getRoleFromIndex,
} from "./stats";
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
        champName: participant.championName,
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
        csPerMin: 0,
        vision: 0,
        damage: 0,
        gold: 0,
        doubleKills: 0,
        tripleKills: 0,
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
    stats.maxKills = Math.max(stats.maxKills, participant.kills);
    stats.maxDeaths = Math.max(stats.maxDeaths, participant.deaths);
    stats.CS +=
      participant.totalMinionsKilled + participant.neutralMinionsKilled;
    stats.damage += participant.totalDamageDealtToChampions;
    stats.gold += participant.goldEarned;
    stats.vision += participant.visionScore;
    stats.csPerMin += calculateCSPerMin(
      participant.totalMinionsKilled + participant.neutralMinionsKilled,
      match.info.gameDuration
    );

    stats.doubleKills += participant.doubleKills;
    stats.tripleKills += participant.tripleKills;
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
