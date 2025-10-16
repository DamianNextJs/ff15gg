import { queueMap } from "@/lib/maps/queueMap";

// -- Custom extended Types
export type SummonerData = {
  // Riot Types
  riotAccount: RiotAccount;
  summoner: Summoner;
  ranked?: RankedData[];
  championMastery?: ChampionMastery[];
  // Custom Types
  champStats?: ChampStats[];
  lastUpdated?: Date;
  platform?: string;
};

// --- Below are the same shape as riot sends them back but stripped down to what we need
// Riot Account data
export type RiotAccount = {
  gameName: string;
  tagLine: string;
  puuid: string;
};

// Summoner data
export type Summoner = {
  profileIconId: number;
  summonerLevel: number;
};

// Ranked data for the summoner
export type RankedData = {
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  leaguePoints: number;
};

// Champion mastery data
export type ChampionMastery = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

// --- Aggregation Types
// Aggregated champion stats
export type ChampStats = {
  champId: number;
  champName: string;
  games: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  winRate: number;
  kda: number;
  maxKills: number;
  maxDeaths: number;
  CS: number;
  csPerMin: number;
  vision: number;
  damage: number;
  gold: number;
  doubleKills: number;
  tripleKills: number;
  quadraKills: number;
  pentaKills: number;
  role: RoleType;
  queue: (typeof queueMap)[keyof typeof queueMap];
};

export type ChampStatsWithAvg = ChampStats & {
  averageKills: number;
  averageDeaths: number;
  averageAssists: number;
  averageCS: number;
  averageCsPerMin: number;
  averageDamage: number;
  averageGold: number;
  averageVision: number;
};

export type RoleType = "Top" | "Jungle" | "Mid" | "Bot" | "Support" | "Unknown";

// Aggregated recent stats for the summoner
export type RecentStats = {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
  winRate: number;
  kda: number;
  mostPlayedChampion: RecentChampStats;
  mostPlayedRole: { role: RoleType; percentage: number };
};

export type RecentChampStats = {
  champId: number;
  games: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  winRate: number;
  kda: number;
};

// Aggregated Recently played teammates summary
export type RecentTeammates = {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
};
