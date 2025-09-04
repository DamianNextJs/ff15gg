import { MatchData } from "@/types/riot";

export function getRecentStats(matches: MatchData[], myPuuid: string) {
  let wins: number = 0;
  let losses: number = 0;
  let kills: number = 0;
  let assists: number = 0;
  let deaths: number = 0;

  matches.forEach((m) => {
    const myParticipant = m.info.participants.find((p) => p.puuid === myPuuid);
    if (!myParticipant) return;
    if (myParticipant.win) {
      wins++;
    } else {
      losses++;
    }
    kills += myParticipant.kills;
    assists += myParticipant.assists;
    deaths += myParticipant.deaths;
  });

  const gamesPlayed = wins + losses;

  return {
    wins,
    losses,
    kills,
    deaths,
    assists,
    gamesPlayed,
  };
}
