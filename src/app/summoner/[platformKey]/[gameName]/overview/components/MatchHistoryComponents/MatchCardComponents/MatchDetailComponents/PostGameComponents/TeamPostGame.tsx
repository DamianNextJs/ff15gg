import { useMatchContext } from "../../../../../contexts/MatchContext";
import { TeamData } from "@/types/match";
import ParticipantPostGame from "./ParticipantsPostGame";
import PostGameHeader from "./PostGameHeader";

export default function TeamPostGame({ team }: { team: TeamData }) {
  const { match } = useMatchContext();

  const teamParticipants = match.info.participants.filter(
    (p) => p.teamId === team.teamId
  );
  return (
    <div>
      {/* Header */}
      <PostGameHeader team={team} />
      {teamParticipants.map((p, i, arr) => (
        <ParticipantPostGame
          key={p.puuid}
          participant={p}
          index={i}
          allParticipants={arr}
        />
      ))}
    </div>
  );
}
