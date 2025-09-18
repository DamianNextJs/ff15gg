"use client";

import { useSummonerData } from "@/context/SummonerContext";
import { getRecentTeammates } from "@/helper/stats/getRecentTeammates";
import RankCard from "./components/RankCard";
import ChampStatsCard from "./components/ChampStatsCard";
import ChampMasteryCard from "./components/ChampMasteryCard";
import RecentlyPlayedWith from "./components/RecentlyPlayedWith";
import MatchHistory from "./components/MatchHistoryComponents/MatchHistory";

export default function Overview() {
  const { summonerData: profileData } = useSummonerData();
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
          platformKey={profileData.platform ?? "unknown"}
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
