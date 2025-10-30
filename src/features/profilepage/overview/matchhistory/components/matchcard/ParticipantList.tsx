import Link from "next/link";
import { RegionKey, regionMap } from "@/lib/maps/regionMap";
import { createSummonerUrl } from "@/utils/summoner";
import { useMatchContext } from "../../../context/MatchContext";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";

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
                  <ChampionIcon
                    championId={p.championId}
                    size={"xs"}
                    border={isMyParticipant}
                  />
                  <Link
                    prefetch={false}
                    href={`/summoner/${regionKey}/${encodeURIComponent(
                      summonerUrl
                    )}/overview`}
                    className={`truncate flex-1 hover:underline ${
                      isMyParticipant && "pointer-events-none"
                    }`}
                    onClick={(e) => e.stopPropagation()}
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
