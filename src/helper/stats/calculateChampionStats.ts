import { ChampStats } from "@/types/summoner";
import { MatchData } from "@/types/match";

export function calculateChampionStats(
  matches: MatchData[],
  summonerPuuid: string
): ChampStats[] {
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

  return Object.values(statsMap)
    .sort((a, b) => b.games - a.games)
    .slice(0, 5);
}
