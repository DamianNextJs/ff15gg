import { connectToDB } from "@/lib/mongodb";
import Summoner from "@/models/Summoner";
import { NextRequest, NextResponse } from "next/server";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(req: NextRequest) {
  await connectToDB();

  const url = req.nextUrl;
  const search = url.searchParams.get("search");
  const platform = url.searchParams.get("platform");

  if (!search || !platform) return NextResponse.json(null, { status: 400 });

  const [inputName, inputTag = ""] = search.split("#");

  const normalizedName = escapeRegex(
    inputName.toLowerCase().replace(/\s+/g, "")
  );
  const escapedTag = escapeRegex(inputTag);

  const results = await Summoner.find({
    normalizedName: { $regex: `^${normalizedName}` },
    tagLine: { $regex: `^${escapedTag}`, $options: "i" },
    platform,
  })
    .limit(5)
    .select("gameName tagLine puuid platform data.summoner")
    .lean();

  const formatted = results.map((s) => ({
    puuid: s.puuid,
    gameName: s.gameName,
    tagLine: s.tagLine,
    region: s.platform,
    profileIconId: s.data.summoner.profileIconId,
    summonerLevel: s.data.summoner.summonerLevel,
  }));

  return NextResponse.json(formatted);
}
