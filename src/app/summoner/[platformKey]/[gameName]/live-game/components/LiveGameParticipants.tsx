import { LiveParticipant } from "@/types/live-game";
import LiveGameParticipant from "./LiveGameParticipant";

export default function LiveGameParticipants({
  myPuuid,
  liveGameParticipants,
  platform,
}: {
  myPuuid: string;
  liveGameParticipants: LiveParticipant[];
  platform: string;
}) {
  return (
    <div className="-mt-4">
      {[100, 200].map((teamId) => (
        <div key={teamId}>
          <div className="bg-accent/50 -mx-4 p-4 text-sm lg:text-base">
            {teamId === 100 ? (
              <p className="text-blue-500 font-semibold">Blue Team</p>
            ) : (
              <p className="text-red-500 font-semibold">Red Team</p>
            )}
          </div>
          {liveGameParticipants
            .filter((p) => p.teamId === teamId)
            .map((participant, i) => {
              const myParticipant = participant.puuid === myPuuid;
              return (
                <LiveGameParticipant
                  platform={platform}
                  key={participant.puuid}
                  participant={participant}
                  myParticipant={myParticipant}
                  position={i}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}
