import RankCard from "./components/RankCard";
import ChampStatsCard from "./components/ChampStatsCard";
import ChampMasteryCard from "./components/ChampMasteryCard";
import RecentlyPlayedWith from "./components/RecentlyPlayedWith";
import MatchHistory from "./components/MatchHistoryComponents/MatchHistory";
import { getSummonerData } from "@/helper/getSummonerData";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import SummonerNotFound from "../SummonerNotFound";
import { MatchesProvider } from "./contexts/MatchesContext";

interface OverviewProps {
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function Overview({ params }: OverviewProps) {
  const { platformKey, gameName } = await params;

  const { platform, region } = regionMap[platformKey as RegionKey];
  const [name, tag = ""] = decodeURIComponent(gameName).split("-");

  let profileData;
  try {
    profileData = await getSummonerData(region, platform, name, tag);
  } catch (error) {
    console.log("error fetching summoner", error);
  }

  if (!profileData)
    return <SummonerNotFound platformKey={platformKey} name={name} tag={tag} />;

  return (
    <div className="lg:flex gap-3 -mt-4">
      <MatchesProvider initialMatches={profileData.matches || []}>
        <div className="flex-1">
          <RankCard data={profileData.ranked || []} rankType="Ranked Solo" />
          <RankCard data={profileData.ranked || []} rankType="Ranked Flex" />
          <ChampStatsCard recentChampStats={profileData?.champStats || []} />
          <ChampMasteryCard
            championMastery={profileData?.championMastery || []}
          />

          <RecentlyPlayedWith
            puuid={profileData.riotAccount.puuid}
            platformKey={profileData.platform ?? "unknown"}
          />
        </div>
        <div className="flex-2">
          <MatchHistory participantPuuid={profileData.riotAccount.puuid} />
        </div>
      </MatchesProvider>
    </div>
  );
}
