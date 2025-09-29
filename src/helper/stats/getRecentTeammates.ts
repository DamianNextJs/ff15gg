import { MatchData } from "@/types/match";
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
  const teammateMap = new Map<string, TeammateSummary>();

  for (const match of matches) {
    const myParticipant = match.info.participants.find(
      (p) => p.puuid === myPuuid
    );
    if (!myParticipant) continue;

    for (const p of match.info.participants) {
      if (p.puuid === myPuuid || p.teamId !== myParticipant.teamId) continue;

      const existing = teammateMap.get(p.puuid);
      if (!existing) {
        teammateMap.set(p.puuid, {
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
        existing.gamesPlayed += 1;
        existing.wins += p.win ? 1 : 0;
        existing.losses += p.win ? 0 : 1;
        existing.winRate = calculateWinrate(existing.wins, existing.losses);
      }
    }
  }

  return Array.from(teammateMap.values())
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
    .slice(0, 5);
}
