export type StatType = "Kills" | "KDA" | "Damage" | "Gold" | "Vision" | "CS";

export default function PerformanceTabHeader({
  sortBy,
  setSortBy,
}: {
  sortBy: StatType;
  setSortBy: React.Dispatch<React.SetStateAction<StatType>>;
}) {
  const sortableStats: StatType[] = [
    "Kills",
    "KDA",
    "Damage",
    "Gold",
    "Vision",
    "CS",
  ];
  return (
    <div className="grid grid-cols-8 lg:grid-cols-9">
      <p className="ml-1 flex items-center col-span-2 lg:col-span-3">Player</p>
      {sortableStats.map((s) => (
        <button
          key={s}
          className={`border-b-2 ${
            sortBy === s
              ? "border-primary text-white font-medium"
              : "border-transparent"
          } p-1 hover:text-white hover:font-medium cursor-pointer`}
          onClick={() => setSortBy(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
