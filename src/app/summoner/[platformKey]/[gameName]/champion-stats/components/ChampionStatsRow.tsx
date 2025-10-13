import { getChampionById } from "@/helper/getChampionById";
import { calculateAverageStats } from "@/helper/stats/stats";
import { ChampStats } from "@/types/summoner";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import ChampionStatsRowCell from "./ChampionStatsRowCell";

export default function ChampionStatsRow({
  stat,
  index,
  isLast,
}: {
  stat: ChampStats;
  index: number;
  isLast: boolean;
}) {
  const champ = getChampionById(stat.champId);
  if (!champ) return null;
  const champIcon = DDragon.championIcon(champ.id);

  const {
    averageKills,
    averageAssists,
    averageDeaths,
    averageCS,
    averageCsPerMin,
    averageDamage,
    averageGold,
    averageVision,
  } = calculateAverageStats(
    stat.kills,
    stat.deaths,
    stat.assists,
    stat.games,
    stat.CS,
    stat.csPerMin,
    stat.damage,
    stat.gold,
    stat.vision
  );

  const cells = [
    // Index
    { content: <p>{index + 1}</p> },
    // Champion
    {
      content: (
        <div className="flex items-center text-start gap-1  ml-2">
          <Image src={champIcon} alt="champ icon" width={30} height={30} />
          <p className="hidden lg:block">{champ.name}</p>
        </div>
      ),
      className: "lg:col-span-2",
    },
    // Winrate
    {
      content: (
        <div className="flex gap-1 justify-center ">
          <p className="font-medium text-white">{stat.winRate}%</p>
          <p className="text-subtle/30">/</p>{" "}
          <p className="text-subtle">
            {stat.wins}W {stat.losses}L
          </p>
        </div>
      ),
      className: "col-span-2",
    },
    // KDA
    {
      content: (
        <div className="flex flex-col items-center ">
          <p className="font-semibold text-white">{stat.kda}</p>
          <div className="flex gap-0.5 text-xs">
            <p>{averageKills}</p>
            <p className="text-subtle/30">/</p>
            <p>{averageDeaths}</p>
            <p className="text-subtle/30">/</p>
            <p>{averageAssists}</p>
          </div>
        </div>
      ),
      className: "col-span-2",
    },
    // Max Kills
    { content: <p className="hidden lg:block">{stat.maxKills}</p> },
    // Max Deaths
    { content: <p className="hidden lg:block">{stat.maxDeaths}</p> },
    // Cs
    {
      content: (
        <div className="hidden lg:block">
          <p>{averageCS}</p>
          <p className="text-xs">({averageCsPerMin})</p>
        </div>
      ),
    },
    // Damage
    {
      content: (
        <p className="hidden lg:block">{averageDamage?.toLocaleString()}</p>
      ),
    },
    // Gold
    {
      content: (
        <p className="hidden lg:block">{averageGold?.toLocaleString()}</p>
      ),
    },
    // Vision
    { content: <p className="hidden lg:block">{averageVision}</p> },
    // Double Kills
    {
      content: (
        <p className="hidden lg:block">
          {stat.doubleKills ? stat.doubleKills : "-"}
        </p>
      ),
    },
    // Triple kills
    {
      content: (
        <p className="hidden lg:block">
          {stat.tripleKills ? stat.tripleKills : "-"}
        </p>
      ),
    },
    // Quadra Kills
    {
      content: (
        <p className="hidden lg:block">
          {stat.quadraKills ? stat.quadraKills : "-"}
        </p>
      ),
    },
    // Penta kills
    {
      content: (
        <p className="hidden lg:block">
          {stat.pentaKills ? stat.pentaKills : "-"}
        </p>
      ),
    },
  ];

  return (
    <div
      className={`grid grid-cols-6 lg:grid-cols-17 py-2 items-center justify-items-center lg:justify-items-normal text-center text-xs lg:text-sm text-subtle ${
        index % 2 === 0 ? "bg-accent/50" : ""
      } ${isLast ? "rounded-b-md" : ""}`}
    >
      {cells.map((cell, i) => (
        <ChampionStatsRowCell key={i} className={cell.className}>
          {cell.content}
        </ChampionStatsRowCell>
      ))}
    </div>
  );
}
