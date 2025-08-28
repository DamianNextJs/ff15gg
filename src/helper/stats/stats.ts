export function calculateKDA(kills: number, assists: number, deaths: number) {
  const effectiveDeaths = deaths === 0 ? 1 : deaths;
  const kda = (kills + assists) / effectiveDeaths;
  return kda.toFixed(2);
}

export function calculateWinrate(wins: number, losses: number) {
  if (!wins || !losses) return 0;
  const totalGames: number = wins + losses;
  const winrate = Math.round((wins / totalGames) * 100);

  return winrate;
}
