// -- Custom extended Types
export interface SummonerData {
  // Riot Types
  riotAccount: RiotAccount;
  summoner: Summoner;
  ranked?: RankedData[];
  championMastery?: ChampionMastery[];
  matches?: MatchData[];
  // Custom Types
  champStats?: ChampStats[];
  lastUpdated?: Date;
  platform?: string;
}

// --- Below are the same shape as riot sends them back but stripped down to what we need
// Riot Account data
export interface RiotAccount {
  gameName: string;
  tagLine: string;
  puuid: string;
}

// Summoner data
export interface Summoner {
  profileIconId: number;
  summonerLevel: number;
}

// Ranked data for the summoner
export interface RankedData {
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  tier: string;
  rank: string;
  wins: number;
  losses: number;
  leaguePoints: number;
}

// Match and participant data
export interface MatchData {
  metadata: {
    matchId: string;
  };
  info: {
    gameMode: string;
    gameEndTimestamp: number;
    gameDuration: number;
    queueId: number;
    platformId: string;
    participants: ParticipantData[];
  };
}

export interface ParticipantData {
  puuid: string;
  riotIdGameName: string;
  riotIdTagline: string;
  championName: string;
  teamId: number;
  profileIcon: number;
  championId: number;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  visionScore: number;
  summoner1Id: number;
  summoner2Id: number;
  neutralMinionsKilled: number;
  totalMinionsKilled: number;
  item0: number | null;
  item1: number | null;
  item2: number | null;
  item3: number | null;
  item4: number | null;
  item5: number | null;
  item6: number | null;
  perks: {
    styles: {
      description: string;
      style: number;
      selections: { perk: number }[];
    }[];
  };
}

// Champion mastery data
export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
}

// --- Aggregation Types
// Aggregated champion stats
export type ChampStats = {
  champId: number;
  games: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
};

// Aggregated recent stats for the summoner
export interface RecentStats {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
}

// Aggregated Recently played teammates summary
export interface RecentTeammates {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number; // 0-100 percentage
}
