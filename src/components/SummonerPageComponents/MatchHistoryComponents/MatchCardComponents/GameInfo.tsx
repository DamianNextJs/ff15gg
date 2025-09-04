import { MatchData } from "@/types/riot";
import { queueMap } from "@/lib/queueMap";
import { formatGameDuration, formatTimeAgo } from "@/helper";

export default function GameInfo({
  isWin,
  match,
}: {
  isWin: boolean;
  match: MatchData;
}) {
  const queueType = queueMap[match.info.queueId];
  const timeAgo = formatTimeAgo(match.info.gameEndTimestamp);
  const formattedGameDuration = formatGameDuration(match.info.gameDuration);

  return (
    <div className="text-xs font-medium flex justify-between">
      <div>
        <span className={`${isWin ? "text-blue-500" : "text-red-500"} `}>
          {isWin ? "WIN" : "LOSS"}
        </span>
        <span className="text-subtle ms-1">{formattedGameDuration}</span>
      </div>
      <div>
        <span>{queueType}</span>
        <span className="text-subtle ms-2">{timeAgo}</span>
      </div>
    </div>
  );
}
