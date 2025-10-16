const API_KEY = process.env.RIOT_API_KEY!;
const headers = { "X-Riot-Token": API_KEY };

async function safeFetch(url: string, context: string) {
  try {
    const res = await fetch(url, { headers });

    if (!res.ok) {
      // Only warn for non-404 erros
      if (res.status !== 404) {
        console.warn(`[RiotAPI:${context}] ${res.status} ${res.statusText}`);
      }
      return null;
    }

    return await res.json();
  } catch {
    console.log(`[RiotAPI:${context}] Network or fetch error`);
    return null;
  }
}

// --- Riot API helpers ---
export async function getRiotAccount(
  gameName: string,
  tagLine: string,
  region: string
) {
  return safeFetch(
    `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    "getRiotAccount"
  );
}

export async function getSummonerByPuuid(puuid: string, platform: string) {
  return safeFetch(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    "getSummonerByPuuid"
  );
}

export async function getChampionMastery(puuid: string, platform: string) {
  return safeFetch(
    `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=3`,
    "getChampionMastery"
  );
}

export async function getRankedInfo(puuid: string, platform: string) {
  return safeFetch(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    "getRankedInfo"
  );
}

export async function getRecentMatchIds(
  puuid: string,
  region: string,
  count = 20
) {
  return safeFetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
    "getRecentMatchIds"
  );
}

export async function getMatch(matchId: string, region: string) {
  return safeFetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    "getMatch"
  );
}

export async function getTimeLine(matchId: string, region: string) {
  return safeFetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline`,
    "getTimeLine"
  );
}

export async function getLiveGame(puuid: string, platform: string) {
  return safeFetch(
    `https://${platform}.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`,
    "getLiveGame"
  );
}
