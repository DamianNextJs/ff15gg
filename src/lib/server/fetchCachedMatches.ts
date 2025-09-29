import Match, { IMatch } from "@/models/Match";
import { connectToDB } from "../mongodb";
import { MatchData } from "@/types/match";

export async function fetchCachedMatches(
  puuid: string,
  offset: number,
  limit: number
): Promise<MatchData[]> {
  await connectToDB();

  const matches = await Match.find({
    "data.info.participants.puuid": puuid,
  })
    .sort({ "data.info.gameEndTimestamp": -1 })
    .skip(offset)
    .limit(limit)
    .lean<IMatch[]>();

  return matches.map((m) => m.data);
}
