"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { getFullSummonerProfile } from "@/helper/getFullSummonerProfile";
import { regionMap } from "@/lib/region";
import RankCard from "@/components/SummonerPageComponents/RankCard";
import { getRankData } from "@/helper/getRankData";
import ProfileCard from "@/components/SummonerPageComponents/ProfileCard";

export default function SummonerPage() {
  const { platformKey, gameName } = useParams<{
    platformKey: string;
    gameName: string;
  }>();

  const [profileData, setProfileData] = useState<any>();
  const [loading, setLoading] = useState(true);

  if (!platformKey || !gameName) return notFound();

  const [name, tag] = decodeURIComponent(gameName).trim().split("#");
  const platform = regionMap[platformKey as keyof typeof regionMap].platform;
  const region = regionMap[platformKey as keyof typeof regionMap].region;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFullSummonerProfile(region, platform, name, tag);
        setProfileData(data);

        console.log("PROFILE DATA: ", data);
      } catch (error) {
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [platformKey, gameName]);

  if (loading) return <div>loading..</div>;
  if (!profileData) return notFound();

  //get ranked data for both queue types after data is not null
  const soloData = getRankData(profileData.ranked, "solo");
  const flexData = getRankData(profileData.ranked, "flex");

  return (
    <main className="h-full lg:mx-50">
      {/* profile background */}
      <div className=" h-1/3 bg-[url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Riven_1.jpg)] bg-cover bg-bg-center">
        <div className="bg-linear-to-r from-bg from-20%  via-bg/60 via-80% to-bg to-100% h-full">
          <div className="p-4 pt-8">
            {/* profile wrapper */}
            <ProfileCard data={profileData} />
            {/* rank wrapper */}
            <div className="mt-10">
              <RankCard data={soloData} rankType={"Ranked Solo"} />
              <RankCard data={flexData} rankType={"Ranked Flex"} />
            </div>
            {/* Champion Stats */}
            <section className="mt-3 w-full bg-secondary rounded-md p-4">
              <div className="space-y-4">
                <h2 className="text-sm font-semibold border-l-2 border-primary ps-3">
                  Champion Stats
                </h2>
              </div>
            </section>
            {/*  */}
          </div>
        </div>
      </div>
    </main>
  );
}
