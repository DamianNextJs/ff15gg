"use client";
import Image from "next/image";
import Link from "next/link";
import { RecentTeammates } from "@/types/summoner";
import { DDragon } from "@/utils/ddragon";
import { createSummonerUrl } from "@/helper/summoner";
import { getRecentTeammates } from "@/helper/stats/getRecentTeammates";
import { useMatches } from "../contexts/MatchesContext";
import { useMemo } from "react";
import { queueMap } from "@/lib/maps/queueMap";
import SectionHeading from "@/components/SectionHeading";

interface RecentlyPlayedWithProps {
  platformKey: string;
  puuid: string;
}

export default function RecentlyPlayedWith({
  platformKey,
  puuid,
}: RecentlyPlayedWithProps) {
  const { matches, currentQueue } = useMatches();
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      if (currentQueue === "all") {
        return m.info.queueId in queueMap;
      } else {
        return m.info.queueId === currentQueue;
      }
    });
  }, [matches, currentQueue]);
  const recentTeammates: RecentTeammates[] = getRecentTeammates(
    filteredMatches,
    puuid
  );

  return (
    <section className="mt-3 bg-secondary rounded-md p-4 pb-0">
      <div className="flex items-center justify-between">
        <SectionHeading text="Recently Played With" />
        <p className="text-xs lg:text-sm text-subtle">
          Last {filteredMatches.length} Games
        </p>
      </div>

      <div className="text-xs text-subtle mt-3 font-medium">
        {/* Headers */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-subtle/15 -mx-4 px-4 py-4 border-t border-accent">
          <p>Summoner</p>
          <p className="text-center">Played</p>
          <p className="text-center">W - L</p>
          <p className="text-center">Win Ratio</p>
        </div>

        {/* Teammates */}
        {recentTeammates.map((teammate: RecentTeammates) => {
          const profileIcon = DDragon.profileIcon(teammate.profileIconId);
          const summonerUrl = createSummonerUrl(
            teammate.gameName,
            teammate.tagLine
          );

          return (
            <Link
              href={`/summoner/${platformKey}/${encodeURIComponent(
                summonerUrl
              )}/overview`}
              prefetch={false}
              key={teammate.puuid}
              className="grid grid-cols-[2fr_1fr_1fr_1fr] -mx-4 px-4 py-3 border-t border-accent hover:bg-subtle/15 cursor-pointer"
            >
              {/* Name + Icon */}
              <div className="flex items-center gap-2">
                <Image src={profileIcon} width={25} height={25} alt="" />
                {teammate.gameName}
              </div>

              {/* Stats */}
              <p className="text-center">{teammate.gamesPlayed}</p>
              <p className="text-center">
                {teammate.wins} - {teammate.losses}
              </p>
              <p className="text-center">{teammate.winRate} %</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
