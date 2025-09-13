import { MatchData, RecentStats } from "@/types/riot";
import MatchHistoryHeader from "./MatchHistoryHeader";
import MatchCard from "./MatchCard";
import { queueMap } from "@/lib/maps/queueMap";

interface MatchHistoryProps {
  matches: MatchData[];
  puuid: string;
  recentStats: RecentStats;
}

export default function MatchHistory({
  matches,
  puuid,
  recentStats,
}: MatchHistoryProps) {
  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Match History
      </h2>

      <MatchHistoryHeader recentStats={recentStats} />

      <div className="mt-3 -mx-2">
        {matches.map((match: MatchData) => {
          const myParticipant = match.info.participants.find(
            (p) => p.puuid === puuid
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
    </section>
  );
}
