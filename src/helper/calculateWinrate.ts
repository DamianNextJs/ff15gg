export function calculateWinrate(wins: number, losses: number) {
  if (!wins || !losses) return 0;
  const totalGames: number = wins + losses;
  const winrate = Math.round((wins / totalGames) * 100);

  return winrate;
}
