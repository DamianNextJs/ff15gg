import { calculateCSPerMin, calculateKDA } from "@/helper";
import { ParticipantData } from "@/types/riot";

export default function PlayerStats({
  myParticipant,
  gameDuration,
}: {
  myParticipant: ParticipantData;
  gameDuration: number;
}) {
  const kills = myParticipant.kills;
  const deaths = myParticipant.deaths;
  const assists = myParticipant.assists;
  const creepScore =
    myParticipant.neutralMinionsKilled + myParticipant.totalMinionsKilled;

  const csPerMin = calculateCSPerMin(creepScore, gameDuration);
  const kda = calculateKDA(kills, deaths, assists);

  return (
    <div className="text-xs font-medium flex justify-between gap-2">
      {/* actual stats */}
      <div className="flex gap-0.5">
        {kills} <p className="text-subtle/50"> / </p>
        <p className="text-red-500">{deaths}</p>{" "}
        <p className="text-subtle/50"> / </p>
        {assists}
      </div>
      {/* kda */}
      <div className="flex gap-0.5">
        <p>{kda}</p>
        <p className="text-subtle font-normal">KDA</p>
      </div>
      {/* CREEP SCORE */}
      <div className="flex gap-0.5">
        {creepScore}
        <p className="font-normal text-subtle"> CS ({csPerMin})</p>
      </div>
    </div>
  );
}
