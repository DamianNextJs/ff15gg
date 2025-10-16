import Summoner, { ISummoner } from "@/database/models/Summoner";
import { connectToDB } from "@/database/mongodb";
import { ChampStats } from "@/types/summoner";
import { normalizeSummonerName } from "@/utils/summoner";

export async function fetchChampionStatsData(
  platform: string,
  gameName: string,
  tagLine: string
): Promise<ChampStats[] | null> {
  await connectToDB();

  // --- Normalize names for query
  const { gameName: normalizedGameName, tagLine: normalizedTagLine } =
    normalizeSummonerName(gameName, tagLine);

  const result = await Summoner.findOne(
    { normalizedGameName, normalizedTagLine, platform },
    { "data.champStats": 1, _id: 0 }
  ).lean<ISummoner>();

  return result?.data.champStats || null;
}
