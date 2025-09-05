import { Key } from "react";
import Image from "next/image";
import { useVersion } from "@/context/VersionContext";
import { MatchData, ParticipantData } from "@/types/riot";
import Link from "next/link";
import { platformToRegionKey, RegionKey, regionMap } from "@/lib/regionMap";

export default function ParticipantList({
  match,
  myParticipant,
}: {
  match: MatchData;
  myParticipant: ParticipantData;
}) {
  const version = useVersion();

  const regionKey: RegionKey =
    platformToRegionKey[match.info.platformId.toLowerCase()];

  return (
    <div className="hidden lg:flex gap-5">
      {[100, 200].map((teamId) => (
        <div key={teamId}>
          {match.info.participants
            .filter((p) => p.teamId === teamId)
            .map((p, key: Key) => {
              const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${p.championName}.png`;

              const isMyParticipant = p.puuid === myParticipant.puuid;

              return (
                <div
                  key={key}
                  className="text-xs w-20 text-left flex my-0.5 gap-0.5"
                >
                  <div
                    className={`${
                      isMyParticipant ? "border-orange-500 border" : ""
                    } size-4`}
                  >
                    <Image
                      src={champIconUrl}
                      alt=""
                      width={15}
                      height={15}
                      unoptimized
                    />
                  </div>
                  <Link
                    href={`/summoner/${regionKey}/${encodeURIComponent(
                      `${p.riotIdGameName}#${p.riotIdTagline}`
                    )}`}
                    className={`truncate flex-1 hover:underline ${
                      isMyParticipant && "pointer-events-none"
                    }`}
                  >
                    {p.riotIdGameName}
                  </Link>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
