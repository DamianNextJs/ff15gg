import type { Metadata } from "next";
import { ReactNode } from "react";
import ProfileCard from "./components/ProfileCard";
import ProfileLinks from "./components/ProfileLinks";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { SummonerProvider } from "@/context/SummonerContext";
import SummonerNotFound from "./SummonerNotFound";
import { getSummonerData } from "@/helper/getSummonerData";

export const metadata: Metadata = {
  title: "Summoner page",
  description: "Summoner page of asf",
};

interface SummonerLayoutProps {
  children: ReactNode;
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function SummonerPageLayout({
  children,
  params,
}: SummonerLayoutProps) {
  const { platformKey, gameName } = await params;

  const { platform, region } = regionMap[platformKey as RegionKey];
  const [name, tag = ""] = decodeURIComponent(gameName).split("-");

  let summonerData;

  try {
    summonerData = await getSummonerData(region, platform, name, tag);
  } catch (error) {
    console.error("error fetching summoner", error);
  }

  if (!summonerData)
    return <SummonerNotFound platformKey={platform} name={name} tag={tag} />;

  return (
    <main className="min-h-screen lg:w-250 mx-auto ">
      <div className="p-4 lg:p-0">
        <SummonerProvider summonerData={summonerData}>
          <div className="relative">
            <ProfileCard />
            <ProfileLinks />
          </div>
          {children}
        </SummonerProvider>
      </div>
    </main>
  );
}
