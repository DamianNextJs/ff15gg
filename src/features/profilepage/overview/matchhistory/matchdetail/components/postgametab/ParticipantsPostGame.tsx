import Image from "next/image";
import Link from "next/link";

import { ParticipantData } from "@/types/match";
import { useMatchContext } from "@/features/profilepage/overview/context/MatchContext";
import { getMatchResultUI } from "../../../utils/matchResult";
import { createSummonerUrl } from "@/utils/summoner";
import {
  calculateCSPerMin,
  getDamageStats,
} from "@/features/profilepage/utils/stats";
import PlayerLoadout from "../../../components/matchcard/PlayerLoadout";
import ItemSlots from "../../../components/matchcard/ItemSlots";
import PlayerStats from "../../../components/matchcard/PlayerStats";

interface ParticipantPostGameProps {
  participant: ParticipantData;
  index: number;
  allParticipants: ParticipantData[];
}

const roleIcons = [
  "/Role_Icons/Role=Top.png",
  "/Role_Icons/Role=Jungle.png",
  "/Role_Icons/Role=Mid.png",
  "/Role_Icons/Role=Bot.png",
  "/Role_Icons/Role=Support.png",
];

export default function ParticipantPostGame({
  participant,
  index,
  allParticipants,
}: ParticipantPostGameProps) {
  const { match, myParticipant } = useMatchContext();
  const { bg, progressBarBg } = getMatchResultUI(
    match.info.gameDuration,
    participant.win,
    participant.puuid === myParticipant.puuid
  );

  const summonerUrl = createSummonerUrl(
    participant.riotIdGameName,
    participant.riotIdTagline
  );

  const { damagePercent, damageDisplay } = getDamageStats(
    participant,
    allParticipants
  );

  const gold =
    participant.goldEarned >= 1000
      ? (participant.goldEarned / 1000).toFixed(1) + "k"
      : participant.goldEarned;
  const cs = participant.totalMinionsKilled + participant.neutralMinionsKilled;
  const csMin = calculateCSPerMin(cs, match.info.gameDuration);
  const visionScore = participant.visionScore;

  return (
    <div
      className={`mt-1 lg:mt-0 -mx-2 px-2 py-1 flex items-center justify-between gap-1 relative ${bg}`}
    >
      {/* === Player Loadout === */}
      <div className="flex items-center gap-2">
        <div className="relative hidden size-4 lg:block">
          {match.info.queueId === 450 ? (
            <Image src={roleIcons[2]} fill alt="role icon" />
          ) : (
            <Image src={roleIcons[index]} fill alt="role icon" />
          )}
        </div>
        <PlayerLoadout sm participant={participant} />
      </div>

      {/* === Name + Items + Stats === */}
      <div className="flex flex-1 flex-col gap-1 lg:flex-row lg:items-center lg:justify-between">
        {/* Summoner name + Items */}
        <div className="flex w-full justify-between items-center lg:w-fit">
          <Link
            href={`/summoner/${match.info.platformId.toLowerCase()}/${encodeURIComponent(
              summonerUrl
            )}/overview`}
            className={`truncate text-xs w-25  ${
              myParticipant.puuid === participant.puuid
                ? "pointer-events-none"
                : "hover:underline"
            }`}
            prefetch={false}
          >
            {participant.riotIdGameName}
          </Link>
          <div className="lg:absolute right-2">
            <ItemSlots sm participant={participant} />
          </div>
        </div>

        {/* Stats */}
        <div className="flex w-full items-center justify-between gap-0.5 lg:gap-2  text-xs text-center lg:grid grid-cols-5 lg:mr-20 ">
          {/* KDA */}
          <div className="flex-1 lg:flex-0 ">
            <PlayerStats
              participant={participant}
              gameDuration={match.info.gameDuration}
              showCS={false}
            />
          </div>

          {/* Damage Bar */}
          <div className="flex justify-center">
            <div>
              <div className="hidden lg:block mb-1">{damageDisplay}</div>
              <div className="h-3 lg:h-1 w-12.5 bg-accent/50 flex text-center relative rounded-sm overflow-hidden">
                <div
                  className={`${progressBarBg}`}
                  style={{ width: `${damagePercent}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-semibold text-xs lg:hidden">
                  {damageDisplay}
                </div>
              </div>
            </div>
          </div>
          {/* Extra stats (desktop only) */}

          <p className="hidden lg:block">{gold}</p>
          <div className="hidden lg:block">
            <p>{cs}</p>
            <p>({csMin})</p>
          </div>
          <p className="hidden lg:block">{visionScore}</p>
        </div>
      </div>
    </div>
  );
}
