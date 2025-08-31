export function calculateKDA(kills: number, assists: number, deaths: number) {
  const effectiveDeaths = deaths === 0 ? 1 : deaths;
  const kda = (kills + assists) / effectiveDeaths;
  return kda.toFixed(2);
}

export function calculateWinrate(wins: number, losses: number) {
  const totalGames: number = wins + losses;
  if (totalGames === 0) return 0;
  const winrate = Math.round((wins / totalGames) * 100);

  return winrate;
}
