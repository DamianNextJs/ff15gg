export function normalizeSummonerName(gameName: string, tagLine: string) {
  return {
    gameName: gameName.replace(/\s+/g, "").toLowerCase(),
    tagLine: tagLine.replace(/\s+/g, "").toLowerCase(),
  };
}
