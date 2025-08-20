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
  gameMode: string;
  gameEndTimeStamp: number;
  gameDuration: number;
  participants: ParticipantData[];
}

export interface ParticipantData {
  riotIdGameName: string;
  riotIdTagLine: string;
  championName: string;
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

  perks: {
    styles: {
      description: string;
      style: number;
      selections: { perk: number }[];
    }[];
  };
  primaryRuneId?: number;
  subStyleId?: number;

  lane: "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "NONE";
  role: "SOLO" | "DUO" | "DUO_CARRY" | "DUO_SUPPORT" | "NONE";
  mappedRole: "TOP" | "JUNGLE" | "MIDDLE" | "ADC" | "SUPPORT" | null;
}

export interface ChampionMastery {
  championId: number;
  championLevel: number;
  championPoints: number;
}
