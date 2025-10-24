export type User = {
  _id?: string;
  email: string;
  image?: string;
  name: string;
  preferences: {
    appearance: "Google" | "Summoner";
  };
  boundRiotAccount?: BoundRiotAccount;
};

export type BoundRiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  summonerLevel: number;
  platform: string;
};
