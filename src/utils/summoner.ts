// make sure summonername is stored consistently in db
export function normalizeSummonerName(gameName?: string, tagLine?: string) {
  return {
    gameName: (gameName ?? "").replace(/\s+/g, "").toLowerCase(),
    tagLine: (tagLine ?? "").replace(/\s+/g, "").toLowerCase(),
  };
}

// used to create consistent url's for summoner pages
export function createSummonerUrl(gameName: string, tagLine: string) {
  const { gameName: normalizedName, tagLine: normalizedTag } =
    normalizeSummonerName(gameName, tagLine);
  return `${normalizedName}-${normalizedTag}`;
}
