import { connectToDB } from "@/lib/mongodb";
import Summoner, { ISummoner } from "@/models/Summoner";
import Match, { IMatch } from "@/models/Match";
import { SummonerData } from "@/types/summoner";
import { MatchData } from "@/types/match";
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
  if (!riotAccount) {
    console.log(`[RIOT MISS] No Riot account for ${gameName}#${tagLine}`);
    return null;
  }
  const summoner = await getSummonerByPuuid(riotAccount.puuid, platform);
  const championMastery = mapChampionMastery(
    await getChampionMastery(riotAccount.puuid, platform)
  );
  const ranked = mapRanked(await getRankedInfo(riotAccount.puuid, platform));

  // --- Fetch recent match IDs ---
  const recentMatchIds = await getRecentMatchIds(riotAccount.puuid, region, 20);

  // Get the platform prefix of the first match to check for platform mismatch
  const firstMatchPlatform = recentMatchIds[0]?.split("_")[0].toLowerCase();

  if (!firstMatchPlatform || firstMatchPlatform !== platform) {
    console.warn(
      `[PLATFORM MISMATCH] Requested ${platform}, but first match is on ${firstMatchPlatform}`
    );
    return null;
  }

  // --- Deduplicate matches already in DB ---
  const existingMatchesInDB = await Match.find({
    "data.metadata.matchId": { $in: recentMatchIds },
  }).lean<IMatch[]>();

  const existingIds = new Set(
    existingMatchesInDB.map((m) => m.data.metadata.matchId)
  );

  const newMatchIds: string[] = recentMatchIds.filter(
    (id: string) => !existingIds.has(id)
  );

  // --- Fetch new matches from Riot API ---
  await new Promise((res) => setTimeout(res, 1000)); // rate limit pause
  const newMatches: MatchData[] = mapMatches(
    await Promise.all(newMatchIds.map((matchId) => getMatch(matchId, region)))
  );

  // --- Insert new matches ---
  if (newMatches.length > 0) {
    await Match.insertMany(newMatches.map((m) => ({ data: m })));
  }

  // --- Calculate champ stats based on all matches ---
  const allMatchesForSummoner = await Match.find({
    "data.info.participants.puuid": riotAccount.puuid,
  }).lean<IMatch[]>();
  const champStats = calculateChampionStats(
    allMatchesForSummoner.map((m) => m.data),
    riotAccount.puuid
  );

  // --- Build the profile data ---
  const profileData: SummonerData = {
    riotAccount,
    summoner: {
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
    },
    ranked,
    championMastery,
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
    lastUpdated: new Date(),
    platform,
  };
}
