import { MatchData } from "@/types/match";

interface MatchResultUI {
  bg: string;
  text: string;
  textColor: string;
}

/**
 * Riot remakes happen if the game ends very early (usually < 5 minutes).
 */
export function isRemake(match: MatchData): boolean {
  return !!match.info.gameDuration && match.info.gameDuration < 300; // 300s = 5min
}

/**
 * Returns UI-related properties (background color, label text, text color)
 * for displaying a match result in the UI.
 *
 * - If the match is a remake (short game < 5 minutes), it returns gray styles
 *   with the label "Remake".
 * - Otherwise, it returns win or loss styles depending on `isWin`.
 */
export function getMatchResultUI(
  match: MatchData,
  isWin: boolean
): MatchResultUI {
  if (isRemake(match)) {
    return {
      bg: "bg-gray-500/40",
      text: "Remake",
      textColor: "text-gray-200",
    };
  }

  return isWin
    ? {
        bg: "bg-win/90",
        text: "WIN",
        textColor: "text-blue-500",
      }
    : {
        bg: "bg-lose/90",
        text: "LOSS",
        textColor: "text-red-500",
      };
}
