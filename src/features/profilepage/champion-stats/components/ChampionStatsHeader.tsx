import ChampionStatsHeaderCell from "./ChampionStatsHeaderCell";
import { SortableChampionStats } from "./ChampionStatsTable";

interface ChampionStatsHeaderProps {
  sortBy: SortableChampionStats | undefined;
  setSortBy: React.Dispatch<
    React.SetStateAction<SortableChampionStats | undefined>
  >;
  sortDirection: "asc" | "desc";
  setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function ChampionStatsHeader({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
}: ChampionStatsHeaderProps) {
  const headers: {
    label: string;
    sortKey: SortableChampionStats;
    className?: string;
    tooltip?: string;
    subLabel?: string;
    showOnLgOnly?: boolean;
  }[] = [
    { label: "#", sortKey: "#" },
    { label: "Champion", className: "lg:col-span-2", sortKey: "Champion" },
    { label: "Win Rate", className: "col-span-2", sortKey: "WinRate" },
    {
      label: "KDA",
      tooltip: "Avg. KDA and Avg. Kills/Deaths/Assists",
      className: "col-span-2",
      sortKey: "KDA",
    },
    {
      label: "Max",
      subLabel: "Kills",
      tooltip: "Max amount of Kills",
      showOnLgOnly: true,
      sortKey: "MaxKills",
    },
    {
      label: "Max",
      subLabel: "Deaths",
      tooltip: "Max amount of Deaths",
      showOnLgOnly: true,
      sortKey: "MaxDeaths",
    },
    {
      label: "CS",
      tooltip: "Avg. CS and Avg. CS per Min",
      showOnLgOnly: true,
      sortKey: "CS",
    },
    {
      label: "Damage",
      tooltip: "Avg. Damage",
      showOnLgOnly: true,
      sortKey: "Damage",
    },
    {
      label: "Gold",
      tooltip: "Avg. Gold",
      showOnLgOnly: true,
      sortKey: "Gold",
    },
    {
      label: "Vision",
      tooltip: "Avg. Vision Score",
      showOnLgOnly: true,
      sortKey: "Vision",
    },
    {
      label: "Double",
      tooltip: "Double Kills",
      showOnLgOnly: true,
      sortKey: "Double",
    },
    {
      label: "Triple",
      tooltip: "Triple Kills",
      showOnLgOnly: true,
      sortKey: "Triple",
    },
    {
      label: "Quadra",
      tooltip: "Quadra Kills",
      showOnLgOnly: true,
      sortKey: "Quadra",
    },
    {
      label: "Penta",
      tooltip: "Penta Kills",
      showOnLgOnly: true,
      sortKey: "Penta",
    },
  ];

  function handleClick(sortKey: SortableChampionStats) {
    if (sortBy === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(sortKey);
      setSortDirection("desc");
    }
  }

  return (
    <div className="grid grid-cols-6 lg:grid-cols-17 py-2 h-12 lg:h-18 text-center text-sm text-subtle">
      {headers.map((props, i) => (
        <ChampionStatsHeaderCell
          key={i}
          {...props}
          isSortedBy={sortBy === props.sortKey}
          sortDirection={sortDirection}
          onClick={() => handleClick(props.sortKey)}
        />
      ))}
    </div>
  );
}
