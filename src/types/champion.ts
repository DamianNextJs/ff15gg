export interface ChampionData {
  id: string;
  name: string;
  spells: ChampionSpell[];
  passive: {
    name: string;
    description: string;
    image: string;
  };
}

export interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  cooldown: number[];
  image: string;
}
