import {
  calculateCSPerMin,
  calculateKDA,
} from "@/features/profilepage/utils/stats";
import { ParticipantData } from "@/types/match";

export default function PlayerStats({
  participant,
  gameDuration,
  showCS,
}: {
  participant: ParticipantData;
  gameDuration: number;
  showCS?: boolean;
}) {
  const kills = participant.kills;
  const deaths = participant.deaths;
  const assists = participant.assists;
  const creepScore =
    participant.neutralMinionsKilled + participant.totalMinionsKilled;

  const csPerMin = calculateCSPerMin(creepScore, gameDuration);
  const kda = calculateKDA(kills, deaths, assists);

  return (
    <div className="text-xs font-medium flex lg:flex-col items-center justify-between gap-2 lg:gap-0.5">
      {/* actual stats */}
      <div className="flex gap-0.5">
        {kills} <p className="text-subtle/50"> / </p>
        <p className="text-red-500">{deaths}</p>{" "}
        <p className="text-subtle/50"> / </p>
        {assists}
      </div>
      {/* kda */}
      <div className="flex gap-0.5">
        <p className="text-white">{kda}</p>
        <p className="text-subtle font-normal">KDA</p>
      </div>
      {/* CREEP SCORE */}
      <div className={`${showCS ? "" : "lg:hidden"} flex gap-0.5`}>
        {creepScore}
        <p className="font-normal text-subtle"> CS ({csPerMin})</p>
      </div>
    </div>
  );
}
