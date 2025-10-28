export type BuildGuide = {
  _id?: string;
  title: string;
  creatorId: string;
  stars: number; // Likes
  championId: number;
  championName: string;
  role: string;
  isAram: boolean;
  items: number[];
  runes: {
    primaryTree: number;
    secondaryTree: number;
    primarySelection: number[];
    secondarySelection: number[];
    statShardSelection: number[];
  };
  summonerSpells: number[];
  skillOrder: number[];
  counterChampionId: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
