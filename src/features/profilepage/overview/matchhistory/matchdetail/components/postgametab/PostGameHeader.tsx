import { useMatchContext } from "@/features/profilepage/overview/context/MatchContext";
import { TeamData } from "@/types/match";
import { getMatchResultUI } from "../../../utils/matchResult";
import BannedChampions from "@/features/shared/components/BannedChampions";
import { calculateTeamGold } from "../../utils/calculateTeamGold";

export default function PostGameHeader({ team }: { team: TeamData }) {
  const { match } = useMatchContext();
  const { text, textColor } = getMatchResultUI(
    match.info.gameDuration,
    team.win
  );

  const { blueTeamGold, redTeamGold } = calculateTeamGold(
    match.info.participants
  );

  return (
    <div className="flex items-center justify-between py-2 text-xs lg:flex-col-reverse lg:items-start lg:gap-2">
      {/* Team Header */}
      <div className="flex w-full justify-between">
        {/* Victory / Defeat + Team */}
        <div className="flex items-center gap-1 lg:w-50">
          <p className={`font-semibold text-sm ${textColor}`}>{text}</p>
          <p className="text-subtle">
            {team.teamId === 100 ? "(Blue Team)" : "(Red Team)"}
          </p>
        </div>

        {/* Column Labels (Desktop) */}
        <div className="hidden flex-1 grid-cols-6 text-center lg:grid mr-1 text-subtle">
          <p>KDA</p>
          <p>Damage</p>
          <p>Gold</p>
          <p>CS</p>
          <p>Vision</p>
          <p>Items</p>
        </div>
      </div>

      {/* Bans */}
      <div className="flex items-center gap-2">
        <p className="hidden lg:block">Bans:</p>
        {team.bans.length > 0 ? (
          <BannedChampions
            sm
            bannedChampions={team.bans.map((ban) => ({
              ...ban,
              teamId: team.teamId as 100 | 200,
            }))}
          />
        ) : (
          <p className="hidden lg:block">-</p>
        )}
        <div className="ml-3 hidden lg:flex items-center gap-1">
          Team Gold:{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-3 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
            />
          </svg>
          {team.teamId === 100
            ? blueTeamGold.toLocaleString()
            : redTeamGold.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
