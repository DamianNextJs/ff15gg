import { MatchData } from "@/types/riot";

/**
 * Merge new matches with existing matches, deduplication by matchid
 * sort by gameEndTimeStamp descending, and limit to `limit` matches.
 */

export function mergeMatches(
  existingMatches: MatchData[] = [],
  incomingMatches: MatchData[] = [],
  cap = 200
) {
  const merged = [...existingMatches, ...incomingMatches];

  const deduped = Array.from(
    new Map(merged.map((m) => [m.metadata.matchId, m])).values()
  ).sort((a, b) => b.info.gameEndTimestamp - a.info.gameEndTimestamp);

  return deduped.slice(0, 200);
}
