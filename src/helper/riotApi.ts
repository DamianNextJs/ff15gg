const API_KEY = process.env.RIOT_API_KEY!;
const headers = { "X-Riot-Token": API_KEY };

// --- Riot API helpers ---
export async function getRiotAccount(
  gameName: string,
  tagLine: string,
  region: string
) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Riot account not found");
  return res.json();
}

export async function getSummonerByPuuid(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Summoner not found");
  return res.json();
}

export async function getChampionMastery(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`,
    { headers }
  );
  // if (!res.ok) throw new Error("Champion Mastery not found");
  return res.json();
}

export async function getRankedInfo(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Ranked info not found");
  return res.json();
}

export async function getRecentMatchIds(
  puuid: string,
  region: string,
  count = 20
) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Match IDs not found");
  return res.json();
}

export async function getMatch(matchId: string, region: string) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Match not found");
  return res.json();
}

export async function getLiveGame(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`,
    { headers }
  );
  // if (!res.ok) throw new Error("Live Game not found");
  return res.json();
}
