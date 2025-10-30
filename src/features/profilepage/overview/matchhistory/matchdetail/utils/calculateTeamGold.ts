import { ParticipantData } from "@/types/match";

export function calculateTeamGold(participants: ParticipantData[]) {
  return participants.reduce(
    (acc, p) => {
      if (p.teamId === 100) acc.blueTeamGold += p.goldEarned;
      else if (p.teamId === 200) acc.redTeamGold += p.goldEarned;
      return acc;
    },
    { blueTeamGold: 0, redTeamGold: 0 }
  );
}
