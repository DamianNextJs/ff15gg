export default function ChampionStatsRowCell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const base = ` ${className}`;
  return <div className={base}>{children}</div>;
}
