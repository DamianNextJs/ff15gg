"use client";

import { updateSummonerProfile } from "@/app/summoner/[platformKey]/[gameName]/actions";
import { formatTimeAgo } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UpdateButtonProps {
  puuid: string;
  region: string;
  platform: string;
  gameName: string;
  tagLine: string;
  lastUpdated: Date;
}
const COOLDOWN_MS = 5 * 60 * 1000;
const STORAGE_KEY = "summonerLastUpdates";

export default function UpdateButton({
  puuid,
  region,
  platform,
  gameName,
  tagLine,
  lastUpdated,
}: UpdateButtonProps) {
  const [flash, setFlash] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();
  const isDisabled = loading || cooldown > 0;

  // Helper to read/write the centralized storage object
  const getStoredTimeStamps = (): Record<string, number> => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  };
  const setStoredTimeStamps = (obj: Record<string, number>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  };

  // Initialize cooldown from localStorage
  useEffect(() => {
    const timestamps = getStoredTimeStamps();
    const lastUpdate = timestamps[puuid];
    if (lastUpdate) {
      const elapsed = Date.now() - Number(lastUpdate);
      setCooldown(Math.max(COOLDOWN_MS - elapsed, 0));
    }
  }, [puuid]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCooldown((c) => {
        const next = c - 1000;
        if (next <= 0) {
          // remove only this puuid from centralized object
          const timestamps = getStoredTimeStamps();
          delete timestamps[puuid];
          setStoredTimeStamps(timestamps);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown, puuid]);

  async function handleClick() {
    if (cooldown > 0) return;

    setLoading(true);
    try {
      await updateSummonerProfile(region, platform, gameName, tagLine);

      // persists timestamp centrally
      const timestamps = getStoredTimeStamps();
      timestamps[puuid] = Date.now();
      setStoredTimeStamps(timestamps);

      setFlash(true);
      setCooldown(COOLDOWN_MS);
      setTimeout(() => setFlash(false), 1000); // reset flash after 1s
      router.refresh();
    } catch (error) {
      console.error("failed to update summoner", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      className={`relative w-30 text-xs lg:text-sm px-2 py-2 rounded-sm font-semibold transition-all duration-300 flex justify-center items-center group ${
        flash ? "bg-yellow-400 scale-105" : "bg-primary"
      } ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {loading ? (
        <span className="size-4 lg:size-5 border-2 border-subtle border-t-transparent rounded-full animate-spin"></span>
      ) : flash ? (
        <span className="relative  flex items-center gap-1">
          Updated
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
      ) : (
        <span className="relative">Update</span>
      )}

      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-4 bg-bg border border-subtle/50 text-xs rounded shadow-lg opacity-0 scale-95 transform transition-all group-hover:opacity-100 group-hover:scale-100 duration-150 ease-out z-50 pointer-events-none min-w-[8rem]  w-max hidden lg:block">
        Last Updated: {formatTimeAgo(lastUpdated)}
        {/* Arrow */}
        <div className="absolute bottom-[-0.4rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-bg border-b border-r border-subtle/50 rotate-45"></div>
      </div>
    </button>
  );
}
