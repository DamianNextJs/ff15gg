import { useMatchContext } from "../../../../../contexts/MatchContext";
import TeamPostGame from "./TeamPostGame";

export default function PostGame() {
  const { match, myParticipant } = useMatchContext();

  const sortedTeams = [...match.info.teams].sort((a, b) =>
    a.teamId === myParticipant.teamId
      ? -1
      : b.teamId === myParticipant.teamId
      ? 1
      : 0
  );

  return (
    <div>
      {sortedTeams.map((team) => (
        <TeamPostGame key={team.teamId} team={team} />
      ))}
    </div>
  );
}
