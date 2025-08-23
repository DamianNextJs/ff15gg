export function calculateKDA(kills: number, assists: number, deaths: number) {
  const effectiveDeaths = deaths === 0 ? 1 : deaths;
  const kda = (kills + assists) / effectiveDeaths;
  return kda.toFixed(2);
}
