export function calculateKDA(kills: number, deaths: number, assists: number) {
  if (deaths === 0) return kills + assists;
  const kda = (kills + assists) / deaths;
  return kda.toFixed(2);
}

export function calculateWinrate(wins: number, losses: number) {
  const totalGames: number = wins + losses;
  if (totalGames === 0) return 0;
  const winrate = Math.round((wins / totalGames) * 100);

  return winrate;
}

export function calculateAverageStats(
  kills: number,
  deaths: number,
  assists: number,
  gamesPlayed: number
) {
  const averageKills = (kills / gamesPlayed).toFixed(1);
  const averageDeaths = (deaths / gamesPlayed).toFixed(1);
  const averageAssists = (assists / gamesPlayed).toFixed(1);

  return { averageKills, averageDeaths, averageAssists };
}

export function calculateCSPerMin(creepScore: number, gameDuration: number) {
  //calcualte CS PER MIN
  const durationInMin = gameDuration / 60;
  const csPerMin = creepScore / durationInMin;
  return csPerMin.toFixed(1);
}
