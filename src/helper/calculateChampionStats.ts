import { ChampStats, MatchData } from "@/types/riot";

export function calculateChampionStats(
  matches: MatchData[],
  summonerPuuid: string
): ChampStats[] {
  const statsMap: Record<number, ChampStats> = {};

  matches.forEach((match) => {
    const participant = match.info.participants.find(
      (p) => p.puuid === summonerPuuid
    );
    if (!participant) return null;

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

    const champStats = statsMap[champId];
    champStats.games++;
    champStats.wins += participant.win ? 1 : 0;
    champStats.losses += participant.win ? 0 : 1;
    champStats.kills += participant.kills;
    champStats.deaths += participant.deaths;
    champStats.assists += participant.assists;
  });

  return Object.values(statsMap)
    .sort((a, b) => b.games - a.games)
    .slice(0, 5);
}
