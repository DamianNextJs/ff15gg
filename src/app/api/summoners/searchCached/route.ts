import { connectToDB } from "@/lib/mongodb";
import Summoner from "@/models/Summoner";

export async function GET(req: Request) {
  await connectToDB();

  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const platform = url.searchParams.get("platform");

  if (!search || !platform) return new Response(null, { status: 400 });

  const [inputName, inputTag = ""] = search.split("#");

  const normalizedName = inputName.toLowerCase().replace(/\s+/g, "");

  const results = await Summoner.find({
    normalizedName: { $regex: `^${normalizedName}` },
    tagLine: { $regex: `^${inputTag}`, $options: "i" },
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

  return new Response(JSON.stringify(formatted), { status: 200 });
}
