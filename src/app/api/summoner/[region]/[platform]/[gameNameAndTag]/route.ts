import { NextResponse } from "next/server";
import { ChampionMastery, MatchData } from "@/types/riot";
import { connectToDB } from "@/lib/mongodb";
import Summoner, { ISummoner } from "@/models/Summoner";
import { calculateChampionStats } from "@/helper/calculateChampionStats";
import { normalizeSummonerName } from "@/helper/normalizeSummonerName";

const API_KEY = process.env.RIOT_API_KEY;

const headers = {
  "X-Riot-Token": API_KEY!,
};

//fetch riot account
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

//fetch summoner account
async function getSummonerByPuuid(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers }
  );
  if (!res.ok) throw new Error("Summoner not found");
  return res.json();
}

//fetch champion mastery
async function getChampionMastery(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
    { headers }
  );

  if (!res.ok) throw new Error("Champion Mastery not found");
  return res.json();
}

//fetch ranked info
async function getRankedInfo(puuid: string, platform: string) {
  const res = await fetch(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers }
  );

  if (!res.ok) throw new Error("Ranked info not found");
  return res.json();
}

//fetch recent match ids
async function getRecentMatchIds(puuid: string, region: string, count = 5) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}`,
    { headers }
  );
  if (!res.ok) throw new Error("Match IDs not found");
  return res.json();
}

//fetch match
async function getMatch(matchId: string, region: string) {
  const res = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    { headers }
  );
  if (!res.ok) throw new Error("Match not found");
  return res.json();
}

//Batch fetch to prevent rate limits
async function fetchMatchesInBatches(
  matchIds: string[],
  region: string,
  batchSize = 5
) {
  const results: MatchData[] = [];
  for (let i = 0; i < matchIds.length; i += batchSize) {
    const batch = matchIds.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((id) => getMatch(id, region).catch(() => null))
    );
    results.push(...batchResults.filter(Boolean));
    await new Promise((r) => setTimeout(r, 1000));
  }

  return results;
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
  await connectToDB();

  const { region, gameNameAndTag, platform } = await params;
  const [rawGameName, rawTagLine] =
    decodeURIComponent(gameNameAndTag).split("#");
  const { gameName, tagLine } = normalizeSummonerName(rawGameName, rawTagLine);
  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "true";

  //check cache first if not forced (force true = when update button clicked for fresh data fetch on summoner page)
  if (!force) {
    const summoner = await Summoner.findOne({
      gameName,
      tagLine,
      region,
    }).lean<ISummoner>();

    if (summoner) {
      return NextResponse.json({
        ...summoner.data,
        lastUpdated: summoner.lastUpdated,
      });
    }
  }

  try {
    // Riot Account
    const riotAccount = await getRiotAccount(gameName, tagLine, region);

    //Summoner
    const summoner = await getSummonerByPuuid(riotAccount.puuid, platform);

    //Champion Mastery
    const champMastery: ChampionMastery[] = await getChampionMastery(
      summoner.puuid,
      platform
    );

    //Ranked
    const ranked = await getRankedInfo(summoner.puuid, platform);

    //fetch last 20 matches safely
    const matchIds = await getRecentMatchIds(riotAccount.puuid, region, 20);
    const matches = await fetchMatchesInBatches(matchIds, region);

    //calculate champion stats
    const champStats = calculateChampionStats(matches, summoner.puuid);

    const profileData = {
      riotAccount,
      summoner,
      ranked,
      matches,
      championMastery: champMastery
        .sort((a, b) => b.championPoints - a.championPoints)
        .slice(0, 3),
      champStats,
    };

    const now = new Date();

    //cache in mongodb
    await Summoner.findOneAndUpdate(
      { puuid: summoner.puuid },
      {
        puuid: summoner.puuid,
        gameName,
        tagLine,
        region,
        data: profileData,
        lastUpdated: now,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ ...profileData, lastUpdated: now });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown Error";
    console.error("Error fetching Summoner profile: ", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
