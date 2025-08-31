import { getRecentTeammates, TeammateSummary } from "@/helper";
import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { MatchData } from "@/types/riot";
import Image from "next/image";
import { Key } from "react";
import Link from "next/link";

export default function RecentlyPlayedWith({
  matches,
  puuid,
  region,
}: {
  region: string;
  matches: MatchData[];
  puuid: string;
}) {
  const version = useLatestDDragonVersion();
  const recentTeammates = getRecentTeammates(matches, puuid);

  return (
    <section className="mt-3 w-full bg-secondary rounded-md p-4 pb-0">
      <h2 className="text-sm md:text-lg font-bold border-l-2 border-primary ps-3">
        Recently Played With
      </h2>

      <div className="text-sm text-subtle mt-3">
        {/* Headers */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-subtle/15 -mx-4 px-4 py-4 border-t border-accent font-semibold">
          <p>Summoner</p>
          <p className="text-center">Played</p>
          <p className="text-center">W - L </p>
          <p className="text-center">Win Ratio</p>
        </div>

        {recentTeammates &&
          recentTeammates.map((teamMate: TeammateSummary, Key: Key) => {
            return (
              <Link
                href={`/summoner/${region}/${encodeURIComponent(
                  `${teamMate.gameName}#${teamMate.tagLine}`
                )}`}
                key={Key}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] -mx-4 px-4 py-3 border-t border-accent font-semibold hover:bg-subtle/15 cursor-pointer"
              >
                {/* name + icon */}
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${teamMate.profileIconId}.png`}
                    width={25}
                    height={25}
                    alt=""
                  />
                  {teamMate.gameName}
                </div>
                {/* stats */}

                <p className="text-center">{teamMate.gamesPlayed}</p>
                <p className="text-center">
                  {teamMate.wins} - {teamMate.losses}{" "}
                </p>
                <p className="text-center">{teamMate.winRate} %</p>
              </Link>
            );
          })}
      </div>
    </section>
  );
}
