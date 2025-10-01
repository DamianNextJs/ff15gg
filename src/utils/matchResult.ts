import { MatchData } from "@/types/match";

interface MatchResultUI {
  bg: string;
  text: string;
  textColor: string;
  hoverBg: string;
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
  isWin: boolean,
  isMine: boolean = false
): MatchResultUI {
  if (isRemake(match)) {
    return {
      bg: "bg-gray-500/40",
      text: "Remake",
      textColor: "text-gray-200",
      hoverBg: "hover:bg-gray-500/30",
    };
  }

  if (isMine) {
    return {
      bg: isWin ? "bg-blue-500/45" : "bg-red-500/45", // slightly different shade for your own
      text: isWin ? "WIN" : "LOSS",
      textColor: isWin ? "text-blue-500" : "text-red-500",
      hoverBg: isWin ? "hover:bg-win/70" : "hover:bg-lose/70",
    };
  }

  return isWin
    ? {
        bg: "bg-win/90",
        text: "WIN",
        textColor: "text-blue-500",
        hoverBg: "hover:bg-win/70",
      }
    : {
        bg: "bg-lose/90",
        text: "LOSS",
        textColor: "text-red-500",
        hoverBg: "hover:bg-lose/70",
      };
}
