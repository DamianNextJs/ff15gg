import { NextResponse } from "next/server";

const API_KEY = process.env.RIOT_API_KEY;

const headers = {
  "X-Riot-Token": API_KEY!,
};

async function getRiotAccount(
  gameName: string,
  tagLine: string,
  region: string
) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    { headers }
  );
  if (!res.ok) throw new Error("Riot account not found");
  return res.json();
}

async function getSummonerByPuuid(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers }
  );
  if (!res.ok) throw new Error("Summoner not found");
  return res.json();
}

async function getRankedInfo(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers }
  );
  if (!res.ok) throw new Error("Ranked info not found");
  return res.json();
}

async function getRecentMatchIds(puuid: string, region: string, count = 5) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
    { headers }
  );
  if (!res.ok) throw new Error("Match IDs not found");
  return res.json();
}

async function getMatch(matchId: string, region: string) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    { headers }
  );
  if (!res.ok) throw new Error("Match not found");
  return res.json();
}

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      region: string;
      platform: string;
      gameNameAndTag: string;
    }>;
  }
) {
  const { region, gameNameAndTag, platform } = await params;
  const [gameName, tagLine] = decodeURIComponent(gameNameAndTag).split("#");
  try {
    // Riot Account
    const riotAccount = await getRiotAccount(gameName, tagLine, region);

    //Summoner
    const summoner = await getSummonerByPuuid(riotAccount.puuid, platform);

    //Ranked
    const ranked = await getRankedInfo(summoner.puuid, platform);

    //Match Ids
    const matchIds = await getRecentMatchIds(riotAccount.puuid, region, 5);

    //matches
    const matches = await Promise.all(
      matchIds.map((id: string) => getMatch(id, region))
    );

    return NextResponse.json({ riotAccount, summoner, ranked, matches });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    console.error("Error fetching Summoner profile: ", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
