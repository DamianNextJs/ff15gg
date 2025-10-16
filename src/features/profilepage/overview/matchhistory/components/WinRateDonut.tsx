export default function WinRateDonut({
  winRate,
  size,
  strokeWidth,
}: {
  winRate: number;
  size: number;
  strokeWidth: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - winRate / 100);

  return (
    <svg width={size} height={size}>
      {/* Background circle (losses) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#EF4444" // red
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* Foreground circle (wins) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#3B82F6" // blue
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
