export type RuneInfo = {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc?: string;
  longDesc?: string;
};

// Style (each top-level rune tree like Domination, Sorcery, etc.)
export type RuneStyle = {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: RuneInfo[];
  }[];
};
