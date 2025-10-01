import Image from "next/image";
import Link from "next/link";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { DDragon } from "@/utils/ddragon";
import { getChampionById } from "@/helper/getChampionById";
import { createSummonerUrl } from "@/helper/summoner";
import { useMatchContext } from "../../../contexts/MatchContext";

export default function ParticipantList() {
  const { match, myParticipant } = useMatchContext();
  const regionKey =
    regionMap[match.info.platformId.toLowerCase() as RegionKey].platform;

  return (
    <div className="hidden lg:flex gap-5">
      {match.info.teams.map((team) => (
        <div key={team.teamId}>
          {match.info.participants
            .filter((p) => p.teamId === team.teamId)
            .map((p) => {
              const champ = getChampionById(p.championId);
              if (!champ) return null;
              const champIconUrl = DDragon.championIcon(champ.id);

              const isMyParticipant = p.puuid === myParticipant.puuid;
              const summonerUrl = createSummonerUrl(
                p.riotIdGameName,
                p.riotIdTagline
              );

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
                    prefetch={false}
                    href={`/summoner/${regionKey}/${encodeURIComponent(
                      summonerUrl
                    )}/overview`}
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
