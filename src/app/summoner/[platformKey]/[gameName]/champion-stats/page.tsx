import { parseSummonerParams } from "@/helper/parseSummonerParams";
import { fetchChampionStatsData } from "@/lib/server/fetchChampionStatsData";
import { notFound } from "next/navigation";
import ChampionStatsTable from "./components/ChampionStatsTable";

interface ChampionStatsProps {
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function ChampionStats({ params }: ChampionStatsProps) {
  const { name, tag, platform } = parseSummonerParams(await params);

  const champStats = await fetchChampionStatsData(platform, name, tag);

  if (!champStats) return notFound();

  return <ChampionStatsTable championStats={champStats} />;
}
