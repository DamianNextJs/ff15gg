import { ChampStatsWithAvg } from "@/types/summoner";
import ChampionStatsRowCell from "./ChampionStatsRowCell";
import { SortableChampionStats } from "./ChampionStatsTable";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";

export default function ChampionStatsRow({
  stat,
  index,
  isLast,
  sortBy,
}: {
  stat: ChampStatsWithAvg;
  index: number;
  isLast: boolean;
  sortBy: SortableChampionStats | undefined;
}) {
  const cells: {
    content: React.ReactNode;
    sortKey: SortableChampionStats;
    className?: string;
    showOnLgOnly?: boolean;
  }[] = [
    // Index
    { content: index + 1, sortKey: "#" },
    // Champion
    {
      content: (
        <div className="flex items-center text-start gap-1 lg:ml-2">
          <ChampionIcon championId={stat.champId} size={"sm"} />
          <p className="hidden lg:block truncate max-w-18">{stat.champName}</p>
        </div>
      ),
      className: "lg:col-span-2",
      sortKey: "Champion",
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
      sortKey: "WinRate",
    },
    // KDA
    {
      content: (
        <div className="flex flex-col items-center ">
          <p className="font-semibold text-white">{stat.kda}</p>
          <div className="flex gap-0.5 text-xs">
            <p>{stat.averageKills}</p>
            <p className="text-subtle/30">/</p>
            <p>{stat.averageDeaths}</p>
            <p className="text-subtle/30">/</p>
            <p>{stat.averageAssists}</p>
          </div>
        </div>
      ),
      className: "col-span-2",
      sortKey: "KDA",
    },
    // Max Kills
    {
      content: stat.maxKills,
      sortKey: "MaxKills",
      showOnLgOnly: true,
    },
    // Max Deaths
    {
      content: stat.maxDeaths,
      sortKey: "MaxDeaths",
      showOnLgOnly: true,
    },
    // Cs
    {
      content: (
        <div>
          <p>{stat.averageCS}</p>
          <p className="text-xs">({stat.averageCsPerMin})</p>
        </div>
      ),
      sortKey: "CS",
      showOnLgOnly: true,
    },
    // Damage
    {
      content: stat.averageDamage?.toLocaleString(),
      sortKey: "Damage",
      showOnLgOnly: true,
    },
    // Gold
    {
      content: stat.averageGold?.toLocaleString(),
      sortKey: "Gold",
      showOnLgOnly: true,
    },
    // Vision
    {
      content: stat.averageVision || "-",
      sortKey: "Vision",
      showOnLgOnly: true,
    },
    // Double Kills
    {
      content: stat.doubleKills || "-",
      sortKey: "Double",
      showOnLgOnly: true,
    },
    // Triple kills
    {
      content: stat.tripleKills || "-",
      sortKey: "Triple",
      showOnLgOnly: true,
    },
    // Quadra Kills
    {
      content: stat.quadraKills || "-",
      sortKey: "Quadra",
      showOnLgOnly: true,
    },
    // Penta kills
    {
      content: stat.pentaKills || "-",
      sortKey: "Penta",
      showOnLgOnly: true,
    },
  ];

  return (
    <div
      className={`grid grid-cols-6 lg:grid-cols-17 h-10 lg:h-13 text-center text-xs lg:text-sm text-subtle overflow-hidden ${
        index % 2 === 0 ? "bg-accent/50" : ""
      } ${isLast ? "rounded-b-md" : ""}`}
    >
      {cells.map((cell, i) => (
        <ChampionStatsRowCell
          key={i}
          className={cell.className}
          isSortedBy={sortBy === cell.sortKey}
          align={cell.sortKey === "Champion" ? "start" : "center"}
          showOnLgOnly={cell.showOnLgOnly}
        >
          {cell.content}
        </ChampionStatsRowCell>
      ))}
    </div>
  );
}
