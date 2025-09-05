import { MatchData, ParticipantData } from "@/types/riot";
import PlayerLoadout from "./PlayerLoadout";
import GameInfo from "./GameInfo";
import ItemSlots from "./ItemSlots";
import PlayerStats from "./PlayerStats";
import ParticipantList from "./ParticipantList";

export default function MatchCard({
  myParticipant,
  match,
}: {
  myParticipant: ParticipantData;
  match: MatchData;
}) {
  //Game Info
  const gameDuration = match.info.gameDuration;

  return (
    <div
      className={`${
        myParticipant?.win ? "bg-win/90" : "bg-lose/90"
      } flex flex-col  rounded-md mt-2 p-2 gap-1 lg:flex-row lg:gap-3 lg:items-center lg:justify-around`}
    >
      <GameInfo isWin={myParticipant.win} match={match} />
      <div className="flex justify-between gap-3">
        <PlayerLoadout myParticipant={myParticipant} />
        <div className="flex flex-col lg:flex-row-reverse justify-end items-end lg:items-center gap-2 lg:gap-3">
          <ItemSlots myParticipant={myParticipant} />
          <PlayerStats
            myParticipant={myParticipant}
            gameDuration={gameDuration}
          />
        </div>
      </div>
      {/* PARTICIPANT LIST */}
      <ParticipantList match={match} myParticipant={myParticipant} />
    </div>
  );
}
