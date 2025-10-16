type MatchResultUI = {
  bg: string;
  text: string;
  textColor: string;
  hoverBg: string;
  progressBarBg: string;
};

/**
 * Riot remakes happen if the game ends very early (usually < 5 minutes).
 */
export function isRemake(gameDuration: number): boolean {
  return !!gameDuration && gameDuration < 300; // 300s = 5min
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
  gameDuration: number,
  isWin: boolean,
  isMine: boolean = false
): MatchResultUI {
  if (isRemake(gameDuration)) {
    return {
      bg: "bg-gray-500/40",
      text: "Remake",
      textColor: "text-gray-200",
      hoverBg: "hover:bg-gray-500/30",
      progressBarBg: "bg-gray-600",
    };
  }

  if (isMine) {
    return {
      bg: isWin ? "bg-blue-500/45" : "bg-red-500/45", // slightly different shade for your own
      text: isWin ? "WIN" : "LOSS",
      textColor: isWin ? "text-blue-500" : "text-red-500",
      hoverBg: isWin ? "hover:bg-win/70" : "hover:bg-lose/70",
      progressBarBg: isWin ? "bg-blue-600" : "bg-red-600",
    };
  }

  return isWin
    ? {
        bg: "bg-win/90",
        text: "WIN",
        textColor: "text-blue-500",
        hoverBg: "hover:bg-win/70",
        progressBarBg: "bg-blue-600",
      }
    : {
        bg: "bg-lose/90",
        text: "LOSS",
        textColor: "text-red-500",
        hoverBg: "hover:bg-lose/70",
        progressBarBg: "bg-red-600",
      };
}
