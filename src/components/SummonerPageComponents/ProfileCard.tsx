"use client";

import { rankBorderColors } from "@/lib/maps/rankBorderColorMap";
import { toNormalCase } from "@/helper/utils/utils";
import { getRankData } from "@/helper/summoner";
import { SummonerData } from "@/types/riot";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DDragon } from "@/helper/utils/ddragon";
import UpdateButton from "./UpdateButton";
import { updateSummonerProfile } from "@/app/summoner/[platformKey]/[gameName]/actions";

interface ProfileCardProps {
  data: SummonerData;
  region: string;
  platform: string;
}

const COOLDOWN_MS = 5 * 60 * 1000;

export default function ProfileCard({
  data,
  region,
  platform,
}: ProfileCardProps) {
  const [flash, setFlash] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  const STORAGE_KEY = `lastUpdate_${data.riotAccount.puuid}`; // unique per summoner

  const iconId = data?.summoner?.profileIconId ?? 0;
  const profileIconUrl = DDragon.profileIcon(iconId);

  const tier = toNormalCase(
    getRankData(data.ranked || [], "solo")?.tier ??
      getRankData(data.ranked || [], "flex")?.tier ??
      ""
  );
  const borderColor = rankBorderColors[tier];
  const lastUpdatedTimeStamp = new Date(data.lastUpdated).getTime();

  // Initialize cooldown from localStorage
  useEffect(() => {
    const lastUpdate = localStorage.getItem(STORAGE_KEY);
    if (lastUpdate) {
      const elapsed = Date.now() - Number(lastUpdate);
      setCooldown(Math.max(COOLDOWN_MS - elapsed, 0));
    }
  }, [STORAGE_KEY]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((c) => c - 1000), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  async function handleClick() {
    if (cooldown > 0) return;

    setLoading(true);

    await updateSummonerProfile(
      region,
      platform,
      data.riotAccount.gameName,
      data.riotAccount.tagLine
    );

    localStorage.setItem(STORAGE_KEY, String(Date.now())); // persist timestamp
    setLoading(false);
    setFlash(true);
    setCooldown(COOLDOWN_MS);
    setTimeout(() => setFlash(false), 1000); // reset flash after 1s
    router.refresh();
  }

  return (
    <section className="flex items-end gap-3">
      <div className="relative w-fit">
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
          className="absolute -top-0.5 bg-bg border-2 left-1/2 -translate-1/2 rounded-md text-xs px-2 py-0.5"
          style={{ borderColor }}
        >
          {data.summoner.summonerLevel}
        </div>
      </div>

      <div className="text-xl lg:text-3xl space-y-1 font-semibold">
        <div>
          <span className="truncate max-w-35">{data.riotAccount.gameName}</span>
          <span className="ms-1 text-subtle">#{data.riotAccount.tagLine}</span>
        </div>
        <UpdateButton
          loading={loading}
          flash={flash}
          handleClick={handleClick}
          lastUpdated={lastUpdatedTimeStamp}
          disabled={cooldown > 0}
        />
      </div>
    </section>
  );
}
