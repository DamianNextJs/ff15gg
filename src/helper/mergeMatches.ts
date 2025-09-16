import { MatchData } from "@/types/riot";

/**
 * Merge new matches with existing matches, deduplication by matchid
 * sort by gameEndTimeStamp descending, and limit to `limit` matches.
 */

export function mergeMatches(
  existingMatches: MatchData[] = [],
  incomingMatches: MatchData[] = [],
  limit = 20
) {
  const existingIds = new Set(existingMatches.map((m) => m.matchId));
  const newMatches = incomingMatches.filter((m) => !existingIds.has(m.matchId));

  const merged = [...existingMatches, ...newMatches].sort(
    (a, b) => b.info.gameEndTimestamp - a.info.gameEndTimestamp
  );

  return merged.slice(0, limit);
}
