"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { getFullSummonerProfile } from "@/helper/summoner/getFullSummonerProfile";
import { regionMap } from "@/lib/region";
import RankCard from "@/components/SummonerPageComponents/RankCard";
import { getRankData } from "@/helper";
import ProfileCard from "@/components/SummonerPageComponents/ProfileCard";
import { SummonerData } from "@/types/riot";
import { getChampionById } from "@/helper/champion/getChampionById";
import ChampStatsCard from "@/components/SummonerPageComponents/ChampStatsCard";
import RecentlyPlayedWith from "@/components/SummonerPageComponents/RecentlyPlayedWith";

export default function SummonerPage() {
  const { platformKey, gameName } = useParams<{
    platformKey: string;
    gameName: string;
  }>();

  const [profileData, setProfileData] = useState<SummonerData | null>(null);
  const [loading, setLoading] = useState(true);

  const { platform, region } = regionMap[platformKey as keyof typeof regionMap];

  useEffect(() => {
    if (!platformKey || !gameName) return notFound();
    const [name, tag] = decodeURIComponent(gameName).trim().split("#");

    async function fetchData() {
      try {
        const data = await getFullSummonerProfile(
          region,
          platform,
          name,
          tag,
          false
        );
        setProfileData(data);

        if (process.env.NODE_ENV === "development") {
          console.log("PROFILE DATA: ", data);
        }
      } catch (error) {
        console.log(error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [gameName, platformKey, region, platform]);

  if (loading) return <div>loading..</div>;
  if (!profileData) return notFound();

  // Champion for background image
  const topChampId = profileData.championMastery?.[0].championId; // champion with highest mastery points
  const bgImgChamp = topChampId
    ? getChampionById(topChampId)
    : getChampionById(92); // riven by default;

  //get ranked data for both queue types after data is not null
  const soloData = getRankData(profileData.ranked || [], "solo");
  const flexData = getRankData(profileData.ranked || [], "flex");

  return (
    <main className="min-h-screen md:mx-20 lg:mx-40 2xl:max-w-2/3 2xl:mx-auto">
      {/* profile background */}
      <div
        className="h-[20vh] md:h-[25vh] bg-cover relative"
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${bgImgChamp.id}_1.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-bg from-40%  via-bg/60 via-75% to-bg to-100%" />
      </div>

      <div className="relative -mt-[20vh] md:-mt-[25vh] p-4 pt-8">
        {/* profile wrapper */}
        <ProfileCard
          data={profileData}
          setData={setProfileData}
          platform={platform}
          region={region}
        />
        {/* rank wrapper */}
        <div className="mt-10 md:mt-20">
          <RankCard data={soloData} rankType={"Ranked Solo"} />
          <RankCard data={flexData} rankType={"Ranked Flex"} />
        </div>
        {/* Champion Stats */}
        <ChampStatsCard recentChampStats={profileData.champStats} />
        {/* Recently Played With*/}
        <RecentlyPlayedWith
          matches={profileData.matches || []}
          puuid={profileData.riotAccount.puuid}
          region={platformKey}
        />
      </div>
    </main>
  );
}
