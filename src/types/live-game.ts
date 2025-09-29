import { RiotAccount } from "./summoner";

export interface LiveGameData {
  riotAccount: RiotAccount;
  liveGame: LiveGame;
}

export interface LiveGame {
  gameQueueConfigId: number;
  participants: LiveParticipant[];
  bannedChampions: BannedChampion[];
  /** Game length in seconds */
  gameLength: number;
}

export interface LiveParticipant {
  puuid: string;
  teamId: 100 | 200;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  riotId: string;
  perks: Perks;
}

interface Perks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

export interface BannedChampion {
  championId: number;
  teamId: 100 | 200;
  pickTurn: number;
}
