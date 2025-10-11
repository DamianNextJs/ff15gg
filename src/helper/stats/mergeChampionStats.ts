import { ChampStats } from "@/types/summoner";
import { calculateKDA, calculateWinrate } from "./stats";

export function mergeChampionStats(championStats: ChampStats[]): ChampStats[] {
  const map = new Map<number, ChampStats>();

  for (const stat of championStats) {
    const key = stat.champId;

    if (!map.has(key)) {
      map.set(key, { ...stat });
    } else {
      const existing = map.get(key);
      if (!existing) continue;
      // merge totals
      existing.games += stat.games;
      existing.wins += stat.wins;
      existing.losses += stat.losses;
      existing.kills += stat.kills;
      existing.deaths += stat.deaths;
      existing.assists += stat.assists;

      existing.maxKills = Math.max(existing.maxKills, stat.maxKills);
      existing.maxDeaths = Math.max(existing.maxDeaths, stat.maxDeaths);

      existing.CS += stat.CS;
      existing.csPerMin += stat.csPerMin;
      existing.vision += stat.vision;
      existing.damage += stat.damage;
      existing.gold += stat.gold;

      existing.doubleKills += stat.doubleKills;
      existing.trippleKills += stat.trippleKills;
      existing.quadraKills += stat.quadraKills;
      existing.pentaKills += stat.pentaKills;

      existing.winRate = calculateWinrate(existing.wins, existing.losses);
      existing.kda = calculateKDA(
        existing.kills,
        existing.deaths,
        existing.assists
      );
    }
  }

  return Array.from(map.values()).sort((a, b) => b.games - a.games);
}
