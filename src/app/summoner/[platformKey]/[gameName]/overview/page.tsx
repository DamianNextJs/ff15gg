import ChampMasteryCard from "@/app/summoner/[platformKey]/[gameName]/overview/components/ChampMasteryCard";
import ChampStatsCard from "@/app/summoner/[platformKey]/[gameName]/overview/components/ChampStatsCard";
import MatchHistory from "@/app/summoner/[platformKey]/[gameName]/overview/components/MatchHistoryComponents/MatchHistory";
import RankCard from "@/app/summoner/[platformKey]/[gameName]/overview/components/RankCard";
import RecentlyPlayedWith from "@/app/summoner/[platformKey]/[gameName]/overview/components/RecentlyPlayedWith";
import { getSummonerData } from "@/helper/getSummonerData";
import { getRecentTeammates } from "@/helper/stats/getRecentTeammates";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";

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

  const profileData = await getSummonerData(region, platform, name, tag);
  if (!profileData) return null;

  const recentTeammates = getRecentTeammates(
    profileData.matches || [],
    profileData.riotAccount.puuid
  );

  return (
    <div className="lg:flex gap-3 -mt-3.5">
      <div className="flex-1">
        <RankCard
          data={profileData?.ranked?.[0] || null}
          rankType="Ranked Solo"
        />
        <RankCard
          data={profileData?.ranked?.[1] || null}
          rankType="Ranked Flex"
        />
        <ChampStatsCard recentChampStats={profileData?.champStats || []} />
        <ChampMasteryCard
          championMastery={profileData?.championMastery || []}
        />
        <RecentlyPlayedWith
          recentTeammates={recentTeammates}
          region={platformKey}
        />
      </div>

      <div className="flex-2">
        <MatchHistory
          matches={profileData.matches || []}
          participantPuuid={profileData.riotAccount.puuid}
        />
      </div>
    </div>
  );
}
