import { MatchData } from "@/types/riot";
import MatchHistoryHeader from "@/components/SummonerPageComponents/MatchHistoryComponents/MatchHistoryHeader";
import { Key } from "react";
import MatchCard from "./MatchCardComponents/MatchCard";

export default function MatchHistory({
  matches,
  puuid,
}: {
  matches: MatchData[];
  puuid: string;
}) {
  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Match History
      </h2>
      <MatchHistoryHeader matches={matches} puuid={puuid} />
      {/* Matches  */}
      <div className="mt-3 -mx-2">
        {matches.map((match: MatchData, key: Key) => {
          //our player
          const myParticipant = match.info.participants.find(
            (p) => p.puuid === puuid
          );
          if (!myParticipant) return null;

          return (
            <MatchCard key={key} myParticipant={myParticipant} match={match} />
          );
        })}
      </div>
      {/* matches */}
    </section>
  );
}
