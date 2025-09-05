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
  lastUpdated: string;
}

export interface RankedData {
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  leaguePoints: number;
  losses: number;
  wins: number;
  rank: string;
  tier: string;
}

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
  assists: number;
  deaths: number;
  kills: number;
  item0: number | null;
  item1: number | null;
  item2: number | null;
  item3: number | null;
  item4: number | null;
  item5: number | null;
  item6: number | null;
  win: boolean;
  visionScore: number;
  summoner1Id: number;
  summoner2Id: number;
  neutralMinionsKilled: number;
  totalMinionsKilled: number;

  perks: {
    styles: {
      description: string;
      style: number;
      selections: { perk: number }[];
    }[];
  };
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
}

export type ChampStats = {
  champId: number;
  games: number;
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
};

export interface CachedSummoner {
  puuid: string;
  gameName: string;
  tagLine: string;
  region: string;
  profileIconId: number;
  summonerLevel: number;
}
