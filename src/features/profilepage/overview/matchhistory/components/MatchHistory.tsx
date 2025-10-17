"use client";

import { useEffect, useMemo, useState, useDeferredValue } from "react";
import { MatchData } from "@/types/match";
import SectionHeading from "@/components/SectionHeading";
import QueueSelector from "@/features/shared/dropdowns/components/QueueSelector";
import MatchHistoryHeader from "./MatchHistoryHeader";
import MatchCard from "./MatchCard";
import MatchHistoryLoader from "./MatchHistoryLoader";
import { useMatches } from "../../context/MatchesContext";
import { getRecentStats } from "../utils/getRecentStats";
import { loadCachedMatches } from "../lib/loadCachedMatches";
import Button from "@/components/Button";

export default function MatchHistory({
  participantPuuid,
}: {
  participantPuuid: string;
}) {
  const { matches, setMatches, currentQueue, setCurrentQueue } = useMatches();
  const [offset, setOffset] = useState(matches.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");

  const deferredSearch = useDeferredValue(searchFilter);

  // Filter matches based on queue selection
  const filteredMatches: MatchData[] = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return matches.filter((m) => {
      const queueMatches =
        currentQueue === "all" ? true : m.info.queueId === currentQueue;

      if (!queueMatches) return false;

      if (!normalizedSearch.trim()) return true;

      const myParticipant = m.info.participants.find(
        (p) => p.puuid === participantPuuid
      );

      const championMatch = myParticipant?.championName
        .toLowerCase()
        .includes(normalizedSearch);

      const nameMatch = m.info.participants.some(
        (p) =>
          p.puuid !== participantPuuid &&
          p.riotIdGameName.toLowerCase().includes(normalizedSearch)
      );

      return championMatch || nameMatch;
    });
  }, [matches, currentQueue, deferredSearch, participantPuuid]);

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
    <section className="mt-3 bg-secondary rounded-md p-4 pt-4">
      <div className="flex items-center justify-between">
        <SectionHeading text="Match History" />
        <div className="flex items-center lg:gap-4">
          <QueueSelector
            currentQueue={currentQueue}
            setCurrentQueue={setCurrentQueue}
          />
          <div className="relative lg:w-67">
            <input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search Champion or Played With..."
              className="bg-accent p-2.5 pr-8 rounded-md outline-none hover:bg-subtle/10 w-full text-sm hidden lg:block"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 hidden lg:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
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
            <Button disabled={loading} onClick={handleLoadMore}>
              Load More
            </Button>
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
