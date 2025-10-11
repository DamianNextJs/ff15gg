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
    teams: TeamData[];
  };
  timeLine?: TimeLineData;
}

export interface TeamData {
  bans: {
    championId: number;
    pickTurn: number;
  }[];
  teamId: number;
  win: boolean;
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
  totalDamageDealtToChampions: number;
  goldEarned: number;
  doubleKills: number;
  trippleKills: number;
  quadraKills: number;
  pentaKills: number;
  perks: {
    styles: {
      description: string;
      style: number;
      selections: { perk: number }[];
    }[];
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    };
  };
}

export interface TimeLineData {
  info: {
    frames: {
      events: EventData[];
    }[];
    participants: TimeLineParticipants[];
  };
}

export interface EventData {
  type: "SKILL_LEVEL_UP" | "ITEM_PURCHASED" | "ITEM_SOLD" | "ITEM_UNDO";
  timestamp: number;
  participantId: number;
  itemId?: number;
  beforeId?: number;
  afterId?: number;
  skillSlot?: number;
}

export interface TimeLineParticipants {
  participantId: number;
  puuid: string;
}
