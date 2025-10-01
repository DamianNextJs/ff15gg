export default function DamageBar({
  isWin,
  damagePercent,
  damageDisplay,
}: {
  isWin: boolean;
  damagePercent: number;
  damageDisplay: number | string;
}) {
  return (
    <div className="h-3 w-12.5 bg-accent/50 flex text-center relative rounded-sm overflow-hidden">
      <div
        className={`${isWin ? "bg-blue-600" : "bg-red-600"}`}
        style={{ width: `${damagePercent}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center font-semibold text-xs">
        {damageDisplay}
      </div>
    </div>
  );
}
