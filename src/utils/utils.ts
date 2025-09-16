// format time values we get from api or db to show in human time
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

export function formatGameDuration(gameDuration: number) {
  const minutes = Math.floor(gameDuration / 60);
  const seconds = gameDuration % 60;

  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
}

// mainly used for showing the rank in NormalCase since its returned in lowercase
export function toNormalCase(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// as riots api return rank divisions, for example Diamond 1 as I instead of 1, we gonna map over them and get the corresponding number.   We also check if the tier is master or higher because those would show 1 for the rank which is unnecessary and instead just return nothing
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
