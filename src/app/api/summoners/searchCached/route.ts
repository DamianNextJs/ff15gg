import Summoner from "@/database/models/Summoner";
import { connectToDB } from "@/database/mongodb";
import { SummonerData } from "@/types/summoner";
import { normalizeSummonerName } from "@/utils/summoner";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();

  const url = req.nextUrl;
  const search = url.searchParams.get("search");
  const platform = url.searchParams.get("platform");

  if (!search || !platform) return NextResponse.json(null, { status: 400 });

  const [inputName, inputTag = ""] = search.split("#");

  const { gameName: normalizedGameName, tagLine: normalizedTagLine } =
    normalizeSummonerName(inputName, inputTag);

  const results = await Summoner.find({
    normalizedGameName: { $regex: `^${normalizedGameName}` },
    normalizedTagLine: { $regex: `^${normalizedTagLine}` },
    platform,
  })
    .limit(5)
    .select(
      "platform data.riotAccount.puuid data.riotAccount.gameName data.riotAccount.tagLine data.summoner.profileIconId data.summoner.summonerLevel"
    )
    .lean();

  const formatted: SummonerData[] = results.map((s) => ({
    ...s.data,
    platform: s.platform,
  }));

  return NextResponse.json(formatted);
}
