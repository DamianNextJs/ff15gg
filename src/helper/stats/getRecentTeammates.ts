import { MatchData } from "@/types/riot";
import { calculateWinrate } from "./stats";

export interface TeammateSummary {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
}

export function getRecentTeammates(
  matches: MatchData[],
  myPuuid: string
): TeammateSummary[] {
  const map = new Map<string, TeammateSummary>();

  for (const match of matches) {
    const myParticipant = match.info.participants.find(
      (p) => p.puuid === myPuuid
    );
    if (!myParticipant) continue;

    for (const p of match.info.participants) {
      if (p.puuid === myPuuid) continue;
      if (p.teamId !== myParticipant.teamId) continue;

      if (!map.has(p.puuid)) {
        map.set(p.puuid, {
          puuid: p.puuid,
          gameName: p.riotIdGameName,
          tagLine: p.riotIdTagline,
          profileIconId: p.profileIcon,
          gamesPlayed: 1,
          wins: p.win ? 1 : 0,
          losses: p.win ? 0 : 1,
          winRate: p.win ? 100 : 0,
        });
      } else {
        const teammate = map.get(p.puuid)!;
        teammate.gamesPlayed += 1;
        teammate.wins += p.win ? 1 : 0;
        teammate.losses += p.win ? 0 : 1;
        teammate.winRate = calculateWinrate(teammate.wins, teammate.losses);
      }
    }
  }

  return Array.from(map.values())
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .slice(0, 5);
}
