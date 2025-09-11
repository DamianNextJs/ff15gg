import Image from "next/image";
import { MatchData, ParticipantData } from "@/types/riot";
import Link from "next/link";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { DDragon } from "@/helper/utils/ddragon";
import { getChampionById } from "@/helper/getChampionById";

export default function ParticipantList({
  match,
  myParticipant,
}: {
  match: MatchData;
  myParticipant: ParticipantData;
}) {
  const regionKey =
    regionMap[match.info.platformId.toLowerCase() as RegionKey].platform;

  return (
    <div className="hidden lg:flex gap-5">
      {[100, 200].map((teamId) => (
        <div key={teamId}>
          {match.info.participants
            .filter((p) => p.teamId === teamId)
            .map((p) => {
              const champ = getChampionById(p.championId);
              if (!champ) return null;
              const champIconUrl = DDragon.championIcon(champ.id);

              const isMyParticipant = p.puuid === myParticipant.puuid;

              return (
                <div
                  key={p.puuid}
                  className="text-xs w-20 text-left flex my-0.5 gap-0.5"
                >
                  <div
                    className={`${
                      isMyParticipant ? "border-orange-500 border" : ""
                    } size-4`}
                  >
                    <Image src={champIconUrl} alt="" width={15} height={15} />
                  </div>
                  <Link
                    href={`/summoner/${regionKey}/${encodeURIComponent(
                      `${p.riotIdGameName}-${p.riotIdTagline}`
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
