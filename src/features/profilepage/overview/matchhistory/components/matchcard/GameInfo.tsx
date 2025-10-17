import { queueMap } from "@/lib/maps/queueMap";
import { formatGameDuration, formatTimeAgo } from "@/utils/utils";
import { useMatchContext } from "../../../context/MatchContext";
import { getMatchResultUI } from "../../utils/matchResult";

export default function GameInfo() {
  const { match, myParticipant } = useMatchContext();

  const queueType = queueMap[match.info.queueId];
  const timeAgo = formatTimeAgo(match.info.gameEndTimestamp);
  const formattedGameDuration = formatGameDuration(match.info.gameDuration);

  const { text, textColor } = getMatchResultUI(
    match.info.gameDuration,
    myParticipant.win
  );

  return (
    <div className="text-xs font-medium flex lg:flex-col-reverse justify-between lg:justify-around items-center text-center gap-1">
      <div>
        <span className={`${textColor}`}>{text}</span>
        <span className="text-subtle ms-1">{formattedGameDuration}</span>
      </div>
      <div className="flex lg:flex-col">
        <span>{queueType}</span>
        <span className="text-subtle ms-2">{timeAgo}</span>
      </div>
    </div>
  );
}
