import { connectToDB } from "@/lib/mongodb";
import Summoner, { ISummoner } from "@/models/Summoner";
import { MatchData, SummonerData } from "@/types/riot";
import { normalizeSummonerName } from "@/helper/summoner";
import { calculateChampionStats } from "@/helper/stats/calculateChampionStats";
import {
  getRiotAccount,
  getSummonerByPuuid,
  getChampionMastery,
  getRankedInfo,
  getRecentMatchIds,
  getMatch,
} from "@/helper/riotApi";
import { mapChampionMastery, mapMatches, mapRanked } from "@/helper/mappers";
import { mergeMatches } from "@/helper/mergeMatches";

export async function fetchAndCacheSummoner(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string,
  force = false
): Promise<SummonerData | null> {
  await connectToDB();

  // --- Normalize names for both query and DB storage ---
  const { gameName: normalizedGameName, tagLine: normalizedTagLine } =
    normalizeSummonerName(gameName, tagLine);

  // --- Fetch existing summoner from DB ---
  const existingSummoner = await Summoner.findOne({
    normalizedGameName,
    normalizedTagLine,
    platform,
  }).lean<ISummoner>();

  if (existingSummoner && !force) {
    console.log(
      `[CACHE HIT] ${normalizedGameName}#${normalizedTagLine} from DB`
    );
    return {
      ...existingSummoner.data,
      matches: existingSummoner?.data?.matches?.slice(0, 20),
      lastUpdated: existingSummoner.lastUpdated,
      platform: existingSummoner.platform,
    };
  }

  if (existingSummoner) {
    console.log(`[FORCE FETCH] ${normalizedGameName}#${normalizedTagLine}`);
  } else {
    console.log(
      `[CACHE MISS] Fetching new summoner ${normalizedGameName}#${normalizedTagLine}`
    );
  }

  // --- Fetch Riot data ---
  const riotAccount = await getRiotAccount(gameName, tagLine, region);
  const summoner = await getSummonerByPuuid(riotAccount.puuid, platform);
  const championMastery = mapChampionMastery(
    await getChampionMastery(riotAccount.puuid, platform)
  );
  const ranked = mapRanked(await getRankedInfo(riotAccount.puuid, platform));

  // --- Fetch recent matches ---
  const recentMatchIds = await getRecentMatchIds(riotAccount.puuid, region, 20);
  await new Promise((res) => setTimeout(res, 1000)); // rate limit pause

  // Get the platform prefix of the first match to check for platform mismatch
  const firstMatchPlatform = recentMatchIds[0]?.split("_")[0].toLowerCase();

  if (!firstMatchPlatform || firstMatchPlatform !== platform) {
    console.warn(
      `[PLATFORM MISMATCH] Requested ${platform}, but first match is on ${firstMatchPlatform}`
    );
    return null;
  }

  const newMatches: MatchData[] = mapMatches(
    await Promise.all(
      recentMatchIds.map((matchId: string) => getMatch(matchId, region))
    )
  );

  // --- Merge with existing matches ---
  const mergedMatches = mergeMatches(
    existingSummoner?.data?.matches ?? [],
    newMatches
  );

  // --- Aggregations ---
  const champStats = calculateChampionStats(mergedMatches, riotAccount.puuid);

  // --- Build the profile data ---
  const profileData: SummonerData = {
    riotAccount,
    summoner: {
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
    },
    ranked,
    championMastery,
    matches: mergedMatches,
    champStats,
  };

  // --- Cache in DB ---
  await Summoner.findOneAndUpdate(
    { "data.riotAccount.puuid": riotAccount.puuid },
    {
      $set: {
        normalizedGameName,
        normalizedTagLine,
        platform,
        lastUpdated: new Date(),
        data: profileData,
      },
    },
    { upsert: true, new: true }
  ).lean<ISummoner>();

  console.log(
    `[DB SAVE] Cached data for ${normalizedGameName}#${normalizedTagLine}`
  );

  return {
    ...profileData,
    matches: profileData.matches?.slice(0, 20),
    lastUpdated: new Date(),
    platform,
  };
}
