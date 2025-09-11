export const regionMap = {
  euw1: {
    label: "EUW",
    platform: "euw1",
    region: "europe",
    color: "bg-blue-500",
  },
  na1: {
    label: "NA",
    platform: "na1",
    region: "americas",
    color: "bg-orange-500",
  },
  kr: {
    label: "KR",
    platform: "kr",
    region: "asia",
    color: "bg-purple-500",
  },
  eun1: {
    label: "EUNE",
    platform: "eun1",
    region: "europe",
    color: "bg-teal-500",
  },
};

export type RegionKey = keyof typeof regionMap;
