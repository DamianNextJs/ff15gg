import { MatchData, ParticipantData } from "@/types/match";
import ParticipantList from "./ParticipantList";
import { useState } from "react";
import { MatchProvider } from "../../../context/MatchContext";
import MatchDetail from "../../matchdetail/MatchDetail";
import { getMatchResultUI } from "../../utils/matchResult";
import GameInfo from "./GameInfo";
import PlayerLoadout from "./PlayerLoadout";
import ItemSlots from "./ItemSlots";
import PlayerStats from "./PlayerStats";

export default function MatchCard({
  myParticipant,
  match,
}: {
  myParticipant: ParticipantData;
  match: MatchData;
}) {
  const [open, setOpen] = useState(false);
  //Game Info
  const gameDuration = match.info.gameDuration;
  const { bg, hoverBg } = getMatchResultUI(
    match.info.gameDuration,
    myParticipant.win
  );

  return (
    <MatchProvider match={match} myParticipant={myParticipant}>
      <div
        className={`${bg} flex flex-col rounded-md ${
          open && "rounded-b-none"
        } mt-2 p-2 gap-1 lg:flex-row lg:gap-3 lg:items-center cursor-pointer transition-colors duration-100 ease-out ${hoverBg}`}
        onClick={() => setOpen(!open)}
      >
        {/* Game Info */}
        <div className="min-w-20">
          <GameInfo />
        </div>
        {/* Player loadout, stats and items */}
        <div className="flex justify-between flex-1">
          <PlayerLoadout participant={myParticipant} sm={false} />
          <div className="flex flex-col lg:flex-row-reverse justify-end items-end lg:items-center gap-2 lg:gap-4">
            <ItemSlots sm={false} participant={myParticipant} />
            <PlayerStats
              participant={myParticipant}
              gameDuration={gameDuration}
              showCS={true}
            />
          </div>
        </div>
        {/* PARTICIPANT LIST */}
        <div className="ms-2">
          <ParticipantList />
        </div>
        {/* Dropdown indicator */}
        <div
          className={`${bg} hidden lg:flex items-end saturate-150 brightness-110 rounded-br-md rounded-tr-md -me-2 -my-2 h-27 p-1`}
        >
          <button
            className={`${bg} saturate-200 brightness-125 p-1 rounded-sm mb-1 cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className={`size-2.5 transition-transform duration-200 ease ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Match detail dropdown */}
      <div className="mt-2">{open && <MatchDetail />}</div>
    </MatchProvider>
  );
}
