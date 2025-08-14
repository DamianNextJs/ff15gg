// as riots api return rank divisions, for example Diamond 1 as I instead of 1, we gonna map over them and get the corresponding number.   We also check if the tier is master or higher because those would show 1 for the rank which is unnecessary and just return nothing

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
