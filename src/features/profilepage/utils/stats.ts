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
  gamesPlayed: number,
  cs = 0,
  csPerMin = 0,
  damage = 0,
  gold = 0,
  vision = 0
): {
  averageKills: number;
  averageDeaths: number;
  averageAssists: number;
  averageCS: number;
  averageCsPerMin: number;
  averageDamage: number;
  averageGold: number;
  averageVision: number;
} {
  if (gamesPlayed === 0) {
    return {
      averageKills: 0,
      averageDeaths: 0,
      averageAssists: 0,
      averageCS: 0,
      averageCsPerMin: 0,
      averageDamage: 0,
      averageGold: 0,
      averageVision: 0,
    };
  }

  const avg = (v: number) => +(v / gamesPlayed).toFixed(1);
  const avg0 = (v: number) => +(v / gamesPlayed).toFixed(0);

  return {
    averageKills: avg(kills),
    averageDeaths: avg(deaths),
    averageAssists: avg(assists),
    averageCS: avg0(cs),
    averageCsPerMin: avg(csPerMin),
    averageDamage: avg0(damage),
    averageGold: avg0(gold),
    averageVision: avg0(vision),
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
