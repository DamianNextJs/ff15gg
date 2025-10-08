import RankCard from "./components/RankCard";
import ChampStatsCard from "./components/ChampStatsCard";
import ChampMasteryCard from "./components/ChampMasteryCard";
import RecentlyPlayedWith from "./components/RecentlyPlayedWith";
import MatchHistory from "./components/MatchHistoryComponents/MatchHistory";
import { getSummonerData } from "@/helper/getSummonerData";
import { MatchesProvider } from "./contexts/MatchesContext";
import { notFound } from "next/navigation";
import { parseSummonerParams } from "@/helper/parseSummonerParams";
import { fetchCachedMatches } from "@/lib/server/fetchCachedMatches";

interface OverviewProps {
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function Overview({ params }: OverviewProps) {
  const { name, tag, platform, region } = parseSummonerParams(await params);

  let profileData;
  try {
    profileData = await getSummonerData(region, platform, name, tag);
  } catch (error) {
    console.log("error fetching summoner", error);
  }

  if (!profileData) return notFound();

  const initialMatches = await fetchCachedMatches(
    profileData.riotAccount.puuid,
    0,
    20
  );

  return (
    <div className="lg:flex gap-3 -mt-4">
      <MatchesProvider initialMatches={initialMatches ?? []}>
        <div className="flex-1">
          <RankCard data={profileData?.ranked || []} rankType="Ranked Solo" />
          <RankCard data={profileData?.ranked || []} rankType="Ranked Flex" />
          <ChampStatsCard
            recentChampStats={profileData?.champStats?.splice(0, 5) || []}
          />
          <ChampMasteryCard
            championMastery={profileData?.championMastery || []}
          />

          <RecentlyPlayedWith
            puuid={profileData?.riotAccount.puuid ?? ""}
            platformKey={profileData?.platform ?? "unknown"}
          />
        </div>
        <div className="flex-2">
          <MatchHistory
            participantPuuid={profileData?.riotAccount.puuid ?? ""}
          />
        </div>
      </MatchesProvider>
    </div>
  );
}
