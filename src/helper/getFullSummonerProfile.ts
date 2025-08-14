export async function getFullSummonerProfile(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string
) {
  const gameNameAndTag = encodeURIComponent(`${gameName}#${tagLine}`);

  const res = await fetch(
    `/api/summoner/${region}/${platform}/${gameNameAndTag}`
  );

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
