"use client";

import MatchHistoryHeader from "./MatchHistoryHeader";
import MatchCard from "./MatchCardComponents/MatchCard";
import { getRecentStats } from "@/helper/stats/getRecentStats";
import MatchHistoryLoader from "./MatchHistoryLoader";
import { useEffect, useMemo, useState } from "react";
import { loadCachedMatches } from "../../../actions";
import { useMatches } from "../../contexts/MatchesContext";
import QueueSelector from "./QueueSelector";
import { queueMap } from "@/lib/maps/queueMap";
import { MatchData } from "@/types/match";

export default function MatchHistory({
  participantPuuid,
}: {
  participantPuuid: string;
}) {
  const { matches, setMatches, currentQueue, setCurrentQueue } = useMatches();
  const [offset, setOffset] = useState(matches.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filter matches based on queue selection
  const filteredMatches: MatchData[] = useMemo(() => {
    return matches.filter((m) => {
      if (currentQueue === "all") {
        return m.info.queueId in queueMap;
      } else {
        return m.info.queueId === currentQueue;
      }
    });
  }, [matches, currentQueue]);

  // Compute recent stats only for displayed matches
  const recentStats = useMemo(
    () => getRecentStats(filteredMatches, participantPuuid),
    [filteredMatches, participantPuuid]
  );

  useEffect(() => {
    setOffset(matches.length);
    setHasMore(matches.length % 20 === 0);
  }, [matches]);

  // Load more matches
  async function handleLoadMore() {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newMatches = await loadCachedMatches(participantPuuid, offset, 20);
      if (newMatches.length === 0) {
        setHasMore(false);
        return;
      }

      setMatches((prev) => [...prev, ...newMatches]);
      setOffset((prev) => prev + newMatches.length);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-3  bg-secondary rounded-md p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
          Match History
        </h2>
        <QueueSelector
          currentQueue={currentQueue}
          setCurrentQueue={setCurrentQueue}
        />
      </div>

      <MatchHistoryHeader recentStats={recentStats} />

      <div className="mt-3 -mx-2">
        {filteredMatches.map((match) => {
          const myParticipant = match.info.participants.find(
            (p) => p.puuid === participantPuuid
          );
          if (!myParticipant) return null;

          return (
            <MatchCard
              key={match.metadata.matchId}
              myParticipant={myParticipant}
              match={match}
            />
          );
        })}
      </div>

      {hasMore ? (
        <div className="flex justify-center mt-4 py-8">
          {loading ? (
            <div className="-my-1.5 lg:-my-2">
              <MatchHistoryLoader />
            </div>
          ) : (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="text-sm lg:text-base px-4 py-2 font-medium bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
            >
              Load More
            </button>
          )}
        </div>
      ) : (
        <p className="text-subtle text-sm lg:text-base mt-4 h-25 lg:h-26 flex  items-center justify-center text-center">
          {filteredMatches.length === 0
            ? "No matches found for this queue"
            : "You've reached the end of your match history"}
        </p>
      )}
    </section>
  );
}
