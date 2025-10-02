import { useState } from "react";
import { useMatchContext } from "../../../../../contexts/MatchContext";
import PerformanceTabHeader, { StatType } from "./PerformanceTabHeader";
import { getChampionById } from "@/helper/getChampionById";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import { calculateKDA } from "@/helper/stats/stats";
import { getMatchResultUI } from "@/utils/matchResult";
import { ParticipantData } from "@/types/match";

export default function PerformanceTab() {
  const { match, myParticipant } = useMatchContext();
  const [sortBy, setSortBy] = useState<StatType>("Damage");

  const sortedParticipants = [...match.info.participants].sort((a, b) => {
    switch (sortBy) {
      case "Kills":
        return b.kills - a.kills;
      case "KDA":
        const kdaA = calculateKDA(a.kills, a.deaths, a.assists);
        const kdaB = calculateKDA(b.kills, b.deaths, b.assists);
        return kdaB - kdaA;
      case "Damage":
        return b.totalDamageDealtToChampions - a.totalDamageDealtToChampions;
      case "Gold":
        return b.goldEarned - a.goldEarned;
      case "Vision":
        return b.visionScore - a.visionScore;
      case "CS":
        const csA = a.totalMinionsKilled + a.neutralMinionsKilled;
        const csB = b.totalMinionsKilled + b.neutralMinionsKilled;
        return csB - csA;
    }
  });

  function getStatValue(p: ParticipantData, sortBy: StatType) {
    switch (sortBy) {
      case "Kills":
        return p.kills;
      case "KDA":
        return calculateKDA(p.kills, p.deaths, p.assists);
      case "Damage":
        return p.totalDamageDealtToChampions;
      case "Gold":
        return p.goldEarned;
      case "Vision":
        return p.visionScore;
      case "CS":
        return p.totalMinionsKilled + p.neutralMinionsKilled;
    }
  }

  const maxStat = Math.max(
    ...match.info.participants.map((p) => getStatValue(p, sortBy))
  );

  return (
    <div className="p-2 text-xs text-subtle overflow-x-auto">
      <div className="min-w-110">
        {/* Header */}
        <PerformanceTabHeader sortBy={sortBy} setSortBy={setSortBy} />

        {/* Performance List  */}

        {sortedParticipants.map((p) => {
          const champ = getChampionById(p.championId);
          if (!champ) return null;
          const champIconUrl = DDragon.championIcon(champ.id);

          const KDA = calculateKDA(p.kills, p.deaths, p.assists);

          const CS = p.totalMinionsKilled + p.neutralMinionsKilled;

          const { bg, progressBarBg } = getMatchResultUI(
            match.info.gameDuration,
            p.win,
            myParticipant.puuid === p.puuid
          );

          const isSorted =
            "text-white font-semibold bg-white/5 h-full w-full flex items-center justify-center";

          return (
            <div
              key={p.puuid}
              className={`${bg} grid grid-cols-8 lg:grid-cols-9 text-center mt-1 h-10 items-center`}
            >
              {/* Player */}
              <div className="flex items-center gap-0.5  lg:gap-1 ml-1 col-span-2 lg:col-span-3">
                <Image
                  src={champIconUrl}
                  alt="champ icon"
                  width={32}
                  height={32}
                />
                <div className="flex flex-col items-start">
                  <p className="truncate text-white font-medium block max-w-17 lg:max-w-40">
                    {p.riotIdGameName} #{p.riotIdTagline}
                  </p>
                  <div className="h-1 bg-accent/50 rounded-md overflow-hidden mt-1 w-15 lg:w-25">
                    <div
                      className={`${progressBarBg} h-full`}
                      style={{
                        width: `${(getStatValue(p, sortBy) / maxStat) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Kills */}
              <div className={`${sortBy === "Kills" && isSorted}`}>
                {p.kills}
              </div>
              {/* KDA */}
              <div className={`${sortBy === "KDA" && isSorted}`}>{KDA}</div>
              {/* Damage */}
              <div className={`${sortBy === "Damage" && isSorted}`}>
                {p.totalDamageDealtToChampions.toLocaleString()}
              </div>
              {/* Gold */}
              <div className={`${sortBy === "Gold" && isSorted}`}>
                {p.goldEarned.toLocaleString()}
              </div>
              {/* Vision */}
              <div className={`${sortBy === "Vision" && isSorted}`}>
                {p.visionScore}
              </div>
              {/* CS */}
              <div className={`${sortBy === "CS" && isSorted}`}>{CS}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
