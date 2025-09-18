"use client";
import { MatchData } from "@/types/riot";
import MatchHistoryHeader from "./MatchHistoryHeader";
import MatchCard from "./MatchCard";
import { queueMap } from "@/lib/maps/queueMap";
import { getRecentStats } from "@/helper/stats/getRecentStats";
import MatchHistoryLoader from "./MatchHistoryLoader";
import { useEffect, useMemo, useState } from "react";
import { loadCachedMatches } from "../../../actions";

interface MatchHistoryProps {
  matches: MatchData[];
  participantPuuid: string;
}

export default function MatchHistory({
  matches: initialMatches,
  participantPuuid,
}: MatchHistoryProps) {
  const [matches, setMatches] = useState<MatchData[]>(initialMatches);
  const [offset, setOffset] = useState(initialMatches.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const recentStats = useMemo(
    () => getRecentStats(matches, participantPuuid),
    [matches, participantPuuid]
  );

  useEffect(() => {
    setInitialLoading(false);
  }, []);

  async function handleLoadMore() {
    setLoading(true);
    try {
      const newMatches = await loadCachedMatches(participantPuuid, offset, 20);
      if (newMatches.length === 0) {
        setHasMore(false);
      } else {
        setMatches((prev) => [...prev, ...newMatches]);
        setOffset((prev) => prev + newMatches.length);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Match History
      </h2>
      {initialLoading && <MatchHistoryLoader />}

      <MatchHistoryHeader recentStats={recentStats} />

      <div className="mt-3 -mx-2">
        {matches.map((match) => {
          const myParticipant = match.info.participants.find(
            (p) => p.puuid === participantPuuid
          );
          if (!myParticipant || !queueMap[match.info.queueId]) return null;

          return (
            <MatchCard
              key={match.metadata.matchId}
              myParticipant={myParticipant}
              match={match}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          {loading ? (
            <MatchHistoryLoader />
          ) : (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </section>
  );
}
