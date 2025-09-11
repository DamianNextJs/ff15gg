import { notFound } from "next/navigation";
import { regionMap, RegionKey } from "@/lib/maps/regionMap";
import RankCard from "@/components/SummonerPageComponents/RankCard";
import ProfileCard from "@/components/SummonerPageComponents/ProfileCard";
import ChampStatsCard from "@/components/SummonerPageComponents/ChampStatsCard";
import RecentlyPlayedWith from "@/components/SummonerPageComponents/RecentlyPlayedWith";
import MatchHistory from "@/components/SummonerPageComponents/MatchHistoryComponents/MatchHistory";
import ChampMasteryCard from "@/components/SummonerPageComponents/ChampMasteryCard";
import { getRankData } from "@/helper/summoner";
import { getChampionById } from "@/helper/getChampionById";
import { getSummonerProfile } from "@/lib/server/getSummonerProfile";
import { SummonerData } from "@/types/riot";

interface SummonerPageProps {
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function SummonerPage({ params }: SummonerPageProps) {
  const { platformKey, gameName } = await params;
  if (!platformKey || !gameName) return notFound();

  const { platform, region } = regionMap[platformKey as RegionKey];
  const [name, tag = ""] = decodeURIComponent(gameName).split("-");

  let profileData: SummonerData | null = null;
  try {
    profileData = await getSummonerProfile(region, platform, name, tag, false);
  } catch (err) {
    console.error(err);
    return notFound();
  }

  if (!profileData) return notFound();

  // --- Champion for background ---
  const topChampId = profileData.championMastery?.[0]?.championId;
  const bgImgChamp = topChampId
    ? getChampionById(topChampId)
    : getChampionById(92); // default Riven

  const soloData = getRankData(profileData.ranked || [], "solo");
  const flexData = getRankData(profileData.ranked || [], "flex");

  return (
    <main className="min-h-screen lg:w-250 mx-auto">
      <div
        className="h-[20vh] lg:h-[27vh] bg-cover relative"
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${bgImgChamp?.id}_1.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-bg from-35% via-bg/60 via-75% to-bg to-100%" />
      </div>

      <div className="relative -mt-[20vh] p-4 pt-8 lg:p-0">
        <ProfileCard data={profileData} platform={platform} region={region} />

        <div className="mt-10 lg:mt-15 lg:flex gap-3">
          <div className="flex-1">
            <RankCard data={soloData} rankType="Ranked Solo" />
            <RankCard data={flexData} rankType="Ranked Flex" />
            <ChampStatsCard recentChampStats={profileData.champStats} />
            <ChampMasteryCard
              championMastery={profileData.championMastery || []}
            />
            <RecentlyPlayedWith
              recentTeammates={profileData.recentTeammates || []}
              region={platformKey}
            />
          </div>

          <div className="flex-2">
            <MatchHistory
              matches={profileData.matches || []}
              puuid={profileData.riotAccount.puuid}
              recentStats={profileData.recentStats || []}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
