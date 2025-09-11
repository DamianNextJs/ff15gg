// utils/ddragon.ts
const LATEST_VERSION = "15.18.1";

export const DDragon = {
  profileIcon(id: number) {
    return `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/profileicon/${id}.png`;
  },

  itemIcon(id: number) {
    return `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/item/${id}.png`;
  },

  championIcon(championName: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/champion/${championName}.png`;
  },

  splash(championName: string, skinNum = 0) {
    return `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/champion/splash/${championName}_${skinNum}.jpg`;
  },

  runeIcon(filename: string) {
    // rune icons are static, version not needed
    return `https://ddragon.leagueoflegends.com/cdn/img/${filename}`;
  },

  summonerSpell(spellName: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${LATEST_VERSION}/img/spell/${spellName}.png`;
  },
};
