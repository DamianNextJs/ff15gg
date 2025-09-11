// --- SummonerData.ts ---

export interface SummonerData {
  summoner: {
    profileIconId: number;
    summonerLevel: number;
    puuid: string;
  };
  riotAccount: {
    gameName: string;
    tagLine: string;
    puuid: string;
  };
  ranked?: RankedData[];
  matches?: MatchData[];
  championMastery?: ChampionMastery[];
  champStats: ChampStats[];
  recentStats: RecentStats;
  recentTeammates: TeammateSummary[];
  lastUpdated: string;
}

// Aggregated recent stats for the summoner
export interface RecentStats {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
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

// Recently played teammates summary
export interface TeammateSummary {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number; // 0-100 percentage
}

// Minimal cached summoner for search suggestions
export interface CachedSummoner {
  puuid: string;
  gameName: string;
  tagLine: string;
  region: string;
  profileIconId: number;
  summonerLevel: number;
}
