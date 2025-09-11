import { MatchData } from "@/types/riot";

export interface RecentStats {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
}

export function getRecentStats(
  matches: MatchData[],
  myPuuid: string
): RecentStats {
  let wins = 0;
  let losses = 0;
  let kills = 0;
  let deaths = 0;
  let assists = 0;

  for (const match of matches) {
    const participant = match.info.participants.find(
      (p) => p.puuid === myPuuid
    );
    if (!participant) continue;

    if (participant.win) wins++;
    else losses++;

    kills += participant.kills;
    deaths += participant.deaths;
    assists += participant.assists;
  }

  const gamesPlayed = wins + losses;

  return { wins, losses, kills, deaths, assists, gamesPlayed };
}
