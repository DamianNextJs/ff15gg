import { getChampionById } from "@/helper/getChampionById";
import { calculateAverageStats } from "@/helper/stats/stats";
import { ChampStats } from "@/types/summoner";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";

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

  return (
    <div
      className={`grid grid-cols-6 lg:grid-cols-17 py-2 items-center justify-items-center lg:justify-items-normal text-center text-xs lg:text-sm text-subtle ${
        index % 2 === 0 ? "bg-accent/75" : ""
      } ${isLast ? "rounded-b-md" : ""}`}
    >
      {/* Rank */}
      <p className="">{index + 1}</p>

      {/* Champion */}
      <div className="flex items-center text-start gap-1 lg:col-span-2 ml-2">
        <Image src={champIcon} alt="champ icon" width={30} height={30} />
        <p className="hidden lg:block">{champ.name}</p>
      </div>

      {/* Winrate */}
      <div className="flex gap-1 justify-center col-span-2">
        <p className="font-medium text-white">{stat.winRate}%</p>
        <p className="text-subtle/30">/</p>{" "}
        <p className="text-subtle">
          {stat.wins}W {stat.losses}L
        </p>
      </div>

      {/* KDA */}
      <div className="flex flex-col items-center col-span-2">
        <p className="font-semibold text-white">{stat.kda}</p>
        <div className="flex gap-0.5 text-xs">
          <p>{averageKills}</p>
          <p className="text-subtle/30">/</p>
          <p>{averageDeaths}</p>
          <p className="text-subtle/30">/</p>
          <p>{averageAssists}</p>
        </div>
      </div>

      {/* Max Kills */}
      <p className="hidden lg:block">{stat.maxKills}</p>

      {/* Max Deaths */}
      <p className="hidden lg:block">{stat.maxDeaths}</p>

      {/* CS */}
      <div className="hidden lg:block">
        <p>{averageCS}</p>
        <p className="text-xs">({averageCsPerMin})</p>
      </div>

      {/* Damage */}
      <p className="hidden lg:block">{averageDamage?.toLocaleString()}</p>

      {/* Gold */}
      <p className="hidden lg:block">{averageGold?.toLocaleString()}</p>

      {/* Vision */}
      <p className="hidden lg:block">{averageVision}</p>

      {/* Double Kills */}
      <p className="hidden lg:block">
        {stat.doubleKills ? stat.doubleKills : "-"}
      </p>
      {/* Tripple Kills */}
      <p className="hidden lg:block">
        {stat.trippleKills ? stat.trippleKills : "-"}
      </p>
      {/* Quadra Kills */}
      <p className="hidden lg:block">
        {stat.quadraKills ? stat.quadraKills : "-"}
      </p>
      {/* Penta Kills */}
      <p className="hidden lg:block">
        {stat.pentaKills ? stat.pentaKills : "-"}
      </p>
    </div>
  );
}
