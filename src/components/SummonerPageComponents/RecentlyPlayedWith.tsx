import Image from "next/image";
import Link from "next/link";
import { TeammateSummary } from "@/types/riot"; // assuming you updated types
import { DDragon } from "@/helper/utils/ddragon";

interface RecentlyPlayedWithProps {
  region: string;
  recentTeammates: TeammateSummary[]; // already aggregated on server
}

export default function RecentlyPlayedWith({
  region,
  recentTeammates,
}: RecentlyPlayedWithProps) {
  if (!recentTeammates || recentTeammates.length === 0) return null;

  return (
    <section className="mt-3 bg-secondary rounded-md p-4 pb-0">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Recently Played With
      </h2>

      <div className="text-xs text-subtle mt-3 font-medium">
        {/* Headers */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-subtle/15 -mx-4 px-4 py-4 border-t border-accent">
          <p>Summoner</p>
          <p className="text-center">Played</p>
          <p className="text-center">W - L</p>
          <p className="text-center">Win Ratio</p>
        </div>

        {/* Teammates */}
        {recentTeammates.map((teammate) => {
          const profileIcon = DDragon.profileIcon(teammate.profileIconId);

          return (
            <Link
              href={`/summoner/${region}/${encodeURIComponent(
                `${teammate.gameName}-${teammate.tagLine}`
              )}`}
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
