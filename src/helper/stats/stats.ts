import { ParticipantData } from "@/types/match";
import { RoleType } from "@/types/summoner";

export function calculateKDA(
  kills: number,
  deaths: number,
  assists: number
): number {
  if (deaths === 0) return kills + assists; // "perfect" KDA
  return +((kills + assists) / deaths).toFixed(2); // always number
}

export function calculateWinrate(wins: number, losses: number): number {
  const totalGames = wins + losses;
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100);
}

export function calculateAverageStats(
  kills: number,
  deaths: number,
  assists: number,
  gamesPlayed: number
): { averageKills: number; averageDeaths: number; averageAssists: number } {
  if (gamesPlayed === 0) {
    return { averageKills: 0, averageDeaths: 0, averageAssists: 0 };
  }
  return {
    averageKills: +(kills / gamesPlayed).toFixed(1),
    averageDeaths: +(deaths / gamesPlayed).toFixed(1),
    averageAssists: +(assists / gamesPlayed).toFixed(1),
  };
}

export function calculateCSPerMin(
  creepScore: number,
  gameDuration: number
): number {
  if (gameDuration <= 0) return 0;
  const durationInMin = gameDuration / 60;
  return +(creepScore / durationInMin).toFixed(1);
}

export function getDamageStats(
  participant: ParticipantData,
  participants: ParticipantData[]
) {
  const maxDamage = Math.max(
    ...participants.map((p) => p.totalDamageDealtToChampions)
  );
  const damagePercent =
    maxDamage > 0
      ? (participant.totalDamageDealtToChampions / maxDamage) * 100
      : 0;

  const damageDisplay =
    participant.totalDamageDealtToChampions >= 1000
      ? (participant.totalDamageDealtToChampions / 1000).toFixed(1) + "k"
      : participant.totalDamageDealtToChampions;

  return { damagePercent, damageDisplay };
}

export function getRoleFromIndex(index: number): RoleType {
  const roleOrder = ["Top", "Jungle", "Mid", "Bot", "Support"];
  const teamIndex = index % 5;
  return roleOrder[teamIndex] as RoleType;
}
