import { MatchData } from "@/types/riot";
import MatchHistoryHeader from "./MatchHistoryHeader";
import MatchCard from "./MatchCard";
import { queueMap } from "@/lib/maps/queueMap";
import { Suspense } from "react";
import { getRecentStats } from "@/helper/stats/getRecentStats";
import MatchHistoryLoader from "./MatchHistoryLoader";

interface MatchHistoryProps {
  matches: MatchData[];
  participantPuuid: string;
}

export default async function MatchHistory({
  matches,
  participantPuuid,
}: MatchHistoryProps) {
  const recentStats = getRecentStats(matches || [], participantPuuid);

  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Match History
      </h2>
      <Suspense fallback={<MatchHistoryLoader />}>
        <MatchHistoryHeader recentStats={recentStats} />

        <div className="mt-3 -mx-2">
          {matches.map((match: MatchData) => {
            const myParticipant = match.info.participants.find(
              (p) => p.puuid === participantPuuid
            );
            if (!myParticipant) return null;
            if (!queueMap[match.info.queueId]) return null;

            return (
              <MatchCard
                key={match.info.gameEndTimestamp}
                myParticipant={myParticipant}
                match={match}
              />
            );
          })}
        </div>
      </Suspense>
    </section>
  );
}
