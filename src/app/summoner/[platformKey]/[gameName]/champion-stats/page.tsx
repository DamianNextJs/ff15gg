import ChampionStatsTable from "@/features/profilepage/champion-stats/components/ChampionStatsTable";
import { fetchChampionStatsData } from "@/features/profilepage/champion-stats/lib/fetchChampionStatsData";
import { parseSummonerParams } from "@/features/profilepage/utils/parseSummonerParams";
import { notFound } from "next/navigation";

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
