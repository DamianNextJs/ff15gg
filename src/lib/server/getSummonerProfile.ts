import { connectToDB } from "@/lib/mongodb";
import Summoner, { ISummoner } from "@/models/Summoner";
import { SummonerData } from "@/types/riot";
import { normalizeSummonerName } from "@/helper/summoner";
import { calculateChampionStats } from "@/helper/stats/calculateChampionStats";
import { getRecentStats } from "@/helper/stats/getRecentStats";
import { getRecentTeammates } from "@/helper/stats/getRecentTeammates";
import {
  getRiotAccount,
  getSummonerByPuuid,
  getChampionMastery,
  getRankedInfo,
  getRecentMatchIds,
  fetchMatchesInBatches,
} from "@/helper/riotApi";
import { mapChampionMastery, mapMatches, mapRanked } from "@/helper/mappers";

// --- Server-side helper ---
export async function getSummonerProfile(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string,
  force = false
): Promise<SummonerData> {
  await connectToDB();
  const normalizedName = normalizeSummonerName(gameName, tagLine).gameName;

  // --- Return cached if exists ---
  if (!force) {
    const cached = await Summoner.findOne({
      normalizedName,
      tagLine,
      platform,
    }).lean<ISummoner>();
    if (cached) return cached.data as SummonerData;
  }

  // --- Fetch Riot data ---
  const riotAccount = await getRiotAccount(gameName, tagLine, region);
  const summoner = await getSummonerByPuuid(riotAccount.puuid, platform);
  const championMastery = mapChampionMastery(
    await getChampionMastery(summoner.puuid, platform)
  );
  const ranked = mapRanked(await getRankedInfo(summoner.puuid, platform));
  const matchIds = await getRecentMatchIds(riotAccount.puuid, region, 20);
  const matches = mapMatches(await fetchMatchesInBatches(matchIds, region));

  // --- Aggregations ---
  const champStats = calculateChampionStats(matches, summoner.puuid);
  const recentStats = getRecentStats(matches, summoner.puuid);
  const recentTeammates = getRecentTeammates(matches, summoner.puuid);

  const profileData: SummonerData = {
    riotAccount: {
      gameName: riotAccount.gameName,
      tagLine: riotAccount.tagLine,
      puuid: riotAccount.puuid,
    },
    summoner: {
      profileIconId: summoner.profileIconId,
      summonerLevel: summoner.summonerLevel,
      puuid: summoner.puuid,
    },
    ranked,
    championMastery,
    matches,
    champStats,
    recentStats,
    recentTeammates,
    lastUpdated: new Date().toISOString(),
  };

  // --- Cache in DB ---
  await Summoner.findOneAndUpdate(
    { puuid: summoner.puuid },
    {
      $set: {
        puuid: summoner.puuid,
        gameName: riotAccount.gameName,
        tagLine: riotAccount.tagLine,
        normalizedName,
        platform,
        data: profileData,
        lastUpdated: new Date(),
      },
    },
    { upsert: true, new: true }
  );

  return profileData;
}
