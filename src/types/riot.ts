export interface SummonerData {
  summoner: {
    profileIconId: number;
    puuid: string;
    summonerLevel: number;
  };
  riotAccount: {
    gameName: string;
    tagLine: string;
    puuid: string;
  };
  ranked?: RankedData[];
}

export interface RankedData {
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  leaguePoints: number;
  losses: number;
  wins: number;
  rank: string;
  tier: string;
}
