export type ItemsData = {
  [key: string]: ItemInfo;
};

export type ItemInfo = {
  name: string;
  plaintext: string;
  description: string;
  gold: number;
};
