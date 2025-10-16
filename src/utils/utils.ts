export function toNormalCase(str: string | undefined) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatTimeAgo(timeStamp: Date | string | number) {
  const time =
    timeStamp instanceof Date
      ? timeStamp.getTime()
      : new Date(timeStamp).getTime();

  const diff = Date.now() - time;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function toRoman(num?: string, tier?: string) {
  const noDivisionTiers = ["Master", "Grandmaster", "Challenger"];
  if (!num || !tier) return;
  if (noDivisionTiers.includes(tier)) return "";

  const map: Record<string, string> = {
    I: "1",
    II: "2",
    III: "3",
    IV: "4",
  };

  return map[num] || "";
}

export function formatGameDuration(gameDuration: number) {
  const minutes = Math.floor(gameDuration / 60);
  const seconds = gameDuration % 60;

  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}
