import { rankBorderColors } from "@/lib/maps/rankBorderColorMap";
import { toNormalCase } from "@/utils/utils";
import { getRankData } from "@/helper/summoner";
import Image from "next/image";
import { DDragon } from "@/utils/ddragon";
import UpdateButton from "./UpdateButton";
import { getChampionById } from "@/helper/getChampionById";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import SummonerNotFound from "@/app/summoner/[platformKey]/[gameName]/SummonerNotFound";
import { getSummonerData } from "@/helper/getSummonerData";

interface ProfileCardProps {
  params: {
    platformKey: string;
    gameName: string;
  };
}

export default async function ProfileCard({ params }: ProfileCardProps) {
  const { platformKey, gameName } = params;

  const { platform, region } = regionMap[platformKey as RegionKey];
  const [name, tag = ""] = decodeURIComponent(gameName).split("-");

  const profileData = await getSummonerData(region, platform, name, tag);

  console.log("PROFILE DATA: ", profileData);

  if (!profileData) {
    return <SummonerNotFound platformKey={platform} name={name} tag={tag} />;
  }

  const iconId = profileData.summoner.profileIconId ?? 0;
  const profileIconUrl = DDragon.profileIcon(iconId);

  const tier = toNormalCase(
    getRankData(profileData?.ranked || [], "solo")?.tier ??
      getRankData(profileData?.ranked || [], "flex")?.tier ??
      ""
  );
  const borderColor = rankBorderColors[tier];
  const lastUpdatedTimeStamp = profileData.lastUpdated ?? new Date();

  // --- Champion for background ---
  const topChampId = profileData?.championMastery?.[0]?.championId ?? 92;
  const bgImgChamp = getChampionById(topChampId);

  return (
    <section className="relative flex items-center h-[20vh] lg:h-[27vh]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover -mt-4 -mx-4 lg:m-0 -z-1"
        style={{
          backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${bgImgChamp?.id}_1.jpg)`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-bg from-35% via-bg/60 via-75% to-bg to-100%" />
      </div>

      {/* Foreground content */}
      <div className="flex gap-3 items-end">
        {/* Profile Icon */}
        <div className="relative">
          <div className="size-20 lg:size-24 relative">
            <Image
              src={profileIconUrl}
              alt="profile icon"
              fill
              className="border-2 rounded-md"
              style={{ borderColor }}
              priority
              sizes="5rem"
            />
          </div>
          <div
            className="absolute  -top-0.5 bg-bg border-2 left-1/2 -translate-1/2 rounded-md text-xs px-2 py-0.5"
            style={{ borderColor }}
          >
            {profileData.summoner.summonerLevel}
          </div>
        </div>
        {/* Profile name */}
        <div className="text-xl lg:text-3xl space-y-1 font-semibold">
          <div className="flex">
            <span className="truncate max-w-35 lg:max-w-70">
              {profileData.riotAccount.gameName}
            </span>
            <span className="ms-1 text-subtle">
              #{profileData.riotAccount.tagLine}
            </span>
          </div>
          <UpdateButton
            region={region}
            platform={platform}
            gameName={name}
            tagLine={tag}
            puuid={profileData.riotAccount.puuid}
            lastUpdated={lastUpdatedTimeStamp}
          />
        </div>
      </div>
    </section>
  );
}
