export interface RuneInfo {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc?: string;
  longDesc?: string;
}

// Style (each top-level rune tree like Domination, Sorcery, etc.)
export interface RuneStyle {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: {
    runes: RuneInfo[];
  }[];
}
