import Summoner, { ISummoner } from "@/models/Summoner";
import { connectToDB } from "../mongodb";

export async function fetchCachedMatches(
  puuid: string,
  offset: number,
  limit: number
) {
  await connectToDB();
  const summoner = await Summoner.findOne({
    "data.riotAccount.puuid": puuid,
  }).lean<ISummoner>();
  if (!summoner?.data.matches) return [];
  return summoner.data.matches.slice(offset, offset + limit);
}
