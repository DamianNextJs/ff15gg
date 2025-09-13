import { MatchData, ParticipantData } from "@/types/riot";
import PlayerLoadout from "./PlayerLoadout";
import GameInfo from "./GameInfo";
import ItemSlots from "./ItemSlots";
import PlayerStats from "./PlayerStats";
import ParticipantList from "./ParticipantList";
import { getMatchResultUI } from "@/helper/utils/matchResult";

export default function MatchCard({
  myParticipant,
  match,
}: {
  myParticipant: ParticipantData;
  match: MatchData;
}) {
  //Game Info
  const gameDuration = match.info.gameDuration;
  const { bg } = getMatchResultUI(match, myParticipant.win);

  return (
    <div
      className={`${bg} flex flex-col rounded-md mt-2 p-2 gap-1 lg:flex-row lg:gap-3 lg:items-center`}
    >
      {/* Game Info */}
      <div className="min-w-28">
        <GameInfo isWin={myParticipant.win} match={match} />
      </div>
      {/* Player loadout, stats and items */}
      <div className="flex justify-between flex-1">
        <PlayerLoadout myParticipant={myParticipant} />
        <div className="flex flex-col lg:flex-row-reverse justify-end items-end lg:items-center gap-2 lg:gap-4">
          <ItemSlots myParticipant={myParticipant} />
          <PlayerStats
            myParticipant={myParticipant}
            gameDuration={gameDuration}
          />
        </div>
      </div>
      {/* PARTICIPANT LIST */}
      <div className="ms-2">
        <ParticipantList match={match} myParticipant={myParticipant} />
      </div>
    </div>
  );
}
