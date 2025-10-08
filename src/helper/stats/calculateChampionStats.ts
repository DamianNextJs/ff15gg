import { ChampStats } from "@/types/summoner";
import { MatchData } from "@/types/match";
import { calculateKDA, calculateWinrate } from "./stats";

export function calculateChampionStats(
  matches: MatchData[],
  summonerPuuid: string
): ChampStats[] {
  if (!matches || matches.length === 0) return [];
  const statsMap: Record<number, ChampStats> = {};

  for (const match of matches) {
    const participant = match.info.participants.find(
      (p) => p.puuid === summonerPuuid
    );
    if (!participant) continue;

    const champId = participant.championId;

    if (!statsMap[champId]) {
      statsMap[champId] = {
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

    const stats = statsMap[champId];
    stats.games++;
    stats.wins += participant.win ? 1 : 0;
    stats.losses += participant.win ? 0 : 1;
    stats.kills += participant.kills;
    stats.deaths += participant.deaths;
    stats.assists += participant.assists;
  }

  for (const stats of Object.values(statsMap)) {
    stats.winRate = calculateWinrate(stats.wins, stats.losses);
    stats.kda = calculateKDA(stats.kills, stats.deaths, stats.assists);
  }

  return Object.values(statsMap).sort((a, b) => b.games - a.games);
}
