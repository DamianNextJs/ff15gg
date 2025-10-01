import { TeamData } from "@/types/match";
import BannedChampions from "@/app/summoner/[platformKey]/[gameName]/live-game/components/BannedChampions";
import { getMatchResultUI } from "@/utils/matchResult";
import { useMatchContext } from "../../../../../contexts/MatchContext";

export default function PostGameHeader({ team }: { team: TeamData }) {
  const { match } = useMatchContext();
  const { text, textColor } = getMatchResultUI(match, team.win);

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
      </div>
    </div>
  );
}
