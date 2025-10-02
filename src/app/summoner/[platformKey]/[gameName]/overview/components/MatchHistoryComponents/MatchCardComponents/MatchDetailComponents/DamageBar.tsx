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
    <div>
      <div className="hidden lg:block mb-1">{damageDisplay}</div>
      <div className="h-3 lg:h-1 w-12.5 bg-accent/50 flex text-center relative rounded-sm overflow-hidden">
        <div
          className={`${isWin ? "bg-blue-600" : "bg-red-600"}`}
          style={{ width: `${damagePercent}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-semibold text-xs lg:hidden">
          {damageDisplay}
        </div>
      </div>
    </div>
  );
}
