"use client";
import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { rankBorderColors } from "@/lib/rankBorderColors";
import { toNormalCase } from "@/helper";
import { getRankData } from "@/helper";
import { SummonerData } from "@/types/riot";
import Image from "next/image";
import { useState } from "react";
import { getFullSummonerProfile } from "@/helper/summoner/getFullSummonerProfile";
import UpdateButton from "../UpdateButton";

interface ProfileCardProps {
  data: SummonerData;
  setData: React.Dispatch<React.SetStateAction<SummonerData | null>>;
  region: string;
  platform: string;
}

export default function ProfileCard({
  data,
  setData,
  region,
  platform,
}: ProfileCardProps) {
  const [loading, setLoading] = useState(false); //Spinner for button
  const [flash, setFlash] = useState(false); // flash button after update
  const version = useLatestDDragonVersion();
  const iconId = data?.summoner?.profileIconId ?? 0;
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;

  const tier = toNormalCase(
    getRankData(data.ranked || [], "solo")?.tier ??
      getRankData(data.ranked || [], "flex")?.tier ??
      ""
  );
  const borderColor = rankBorderColors[tier];

  const lastUpdatedTimeStamp = new Date(data.lastUpdated).getTime();

  // handle clicking "update button"
  async function handleClick() {
    setLoading(true);
    setFlash(false);

    try {
      const freshData = await getFullSummonerProfile(
        region,
        platform,
        data.riotAccount.gameName,
        data.riotAccount.tagLine,
        true
      );
      setData(freshData);

      setFlash(true);
      setTimeout(() => setFlash(false), 1200);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-end gap-3">
      <div className="relative w-fit">
        <Image
          src={profileIconUrl}
          alt="profile icon"
          width={80}
          height={80}
          className="border-2  rounded-md"
          style={{ borderColor }}
          priority
        />

        <div
          className="absolute -top-0.5 bg-bg border-2 $ left-1/2 -translate-1/2 rounded-md text-xs px-2 py-0.5"
          style={{ borderColor }}
        >
          {data.summoner.summonerLevel}
        </div>
      </div>
      <div className="text-xl space-y-1 font-semibold">
        <div>
          <span className="truncate max-w-35">
            {data.riotAccount.gameName}{" "}
          </span>
          <span className="ms-1 text-subtle ">#{data.riotAccount.tagLine}</span>
        </div>
        {/* update button */}
        <UpdateButton
          loading={loading}
          flash={flash}
          handleClick={handleClick}
          lastUpdated={lastUpdatedTimeStamp}
        />
      </div>
    </section>
  );
}
