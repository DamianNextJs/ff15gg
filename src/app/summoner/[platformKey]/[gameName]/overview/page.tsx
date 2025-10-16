import { notFound } from "next/navigation";
import RankCard from "@/features/profilepage/overview/components/RankCard";
import ChampStatsCard from "@/features/profilepage/overview/components/ChampStatsCard";
import ChampMasteryCard from "@/features/profilepage/overview/components/ChampMasteryCard";
import RecentlyPlayedWith from "@/features/profilepage/overview/components/RecentlyPlayedWith";
import MatchHistory from "@/features/profilepage/overview/matchhistory/components/MatchHistory";
import { parseSummonerParams } from "@/features/profilepage/utils/parseSummonerParams";
import { fetchCachedMatches } from "@/features/profilepage/overview/lib/fetchCachedMatches";
import { getSummonerData } from "@/features/profilepage/utils/getSummonerData";
import { MatchesProvider } from "@/features/profilepage/overview/context/MatchesContext";

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
          <ChampStatsCard championStats={profileData?.champStats || []} />
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
