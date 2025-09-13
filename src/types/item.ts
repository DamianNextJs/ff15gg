export interface ItemsData {
  [key: string]: ItemInfo;
}

export interface ItemInfo {
  name: string;
  plaintext: string;
  description: string;
  gold: {
    total: number;
  };
}
