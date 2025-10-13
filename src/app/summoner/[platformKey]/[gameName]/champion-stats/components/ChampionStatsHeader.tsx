import HeaderCell from "./ChampionStatsHeaderCell";

export default function ChmapionStatsHeader() {
  const headers = [
    { label: "#" },
    { label: "Champion", className: "lg:col-span-2" },
    { label: "Win Rate", className: "col-span-2" },
    {
      label: "KDA",
      tooltip: "Avg. KDA and Avg. Kills/Deaths/Assists",
      className: "col-span-2",
    },
    {
      label: "Max",
      subLabel: "Kills",
      tooltip: "Max amount of Kills",
      showOnLgOnly: true,
    },
    {
      label: "Max",
      subLabel: "Deaths",
      tooltip: "Max amount of Deaths",
      showOnLgOnly: true,
    },
    { label: "CS", tooltip: "Avg. CS and Avg. CS per Min", showOnLgOnly: true },
    { label: "Damage", tooltip: "Avg. Damage", showOnLgOnly: true },
    { label: "Gold", tooltip: "Avg. Gold", showOnLgOnly: true },
    { label: "Vision", tooltip: "Avg. Vision Score", showOnLgOnly: true },
    { label: "Double", tooltip: "Double Kills", showOnLgOnly: true },
    { label: "Triple", tooltip: "Triple Kills", showOnLgOnly: true },
    { label: "Quadra", tooltip: "Quadra Kills", showOnLgOnly: true },
    { label: "Penta", tooltip: "Penta Kills", showOnLgOnly: true },
  ];

  return (
    <div className="grid grid-cols-6 lg:grid-cols-17 h-12 lg:h-18 items-center justify-items-center lg:justify-items-normal text-center text-sm text-subtle">
      {headers.map((props, i) => (
        <HeaderCell key={i} {...props} />
      ))}
    </div>
  );
}
