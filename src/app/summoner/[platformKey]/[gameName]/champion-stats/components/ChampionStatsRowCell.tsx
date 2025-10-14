export default function ChampionStatsRowCell({
  children,
  className = "",
  isSortedBy = false,
  align = "center",
  showOnLgOnly = false,
}: {
  children: React.ReactNode;
  className?: string;
  isSortedBy: boolean;
  align?: "start" | "center";
  showOnLgOnly?: boolean;
}) {
  const base = `h-full items-center ${
    align === "start" ? "justify-center lg:justify-start" : "justify-center"
  } ${className} ${isSortedBy ? "bg-white/5" : ""} ${
    showOnLgOnly ? "hidden lg:flex" : "flex"
  }`;
  return <div className={base}>{children}</div>;
}
