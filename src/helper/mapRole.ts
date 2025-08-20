export function MapRole(
  lane: string,
  role: string
): "TOP" | "JUNGLE" | "MIDDLE" | "ADC" | "SUPPORT" | null {
  if (lane === "TOP" && role === "SOLO") return "TOP";
  if (lane === "JUNGLE") return "JUNGLE";
  if (lane === "MIDDLE" && role === "SOLO") return "MIDDLE";
  if (lane === "BOTTOM" && "DUO_CARRY") return "ADC";
  if (lane === "BOTTOM" && "DUO_SUPPORT") return "SUPPORT";
  return null;
}
