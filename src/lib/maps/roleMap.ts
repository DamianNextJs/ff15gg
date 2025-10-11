import { RoleType } from "@/types/summoner";

export const roleMap: Record<RoleType, { label: string; icon: string }> = {
  Top: { label: "Top", icon: "/Role_Icons/Role=Top.png" },
  Jungle: { label: "Jungle", icon: "/Role_Icons/Role=Jungle.png" },
  Mid: { label: "Mid", icon: "/Role_Icons/Role=Mid.png" },
  Bot: { label: "Adc", icon: "/Role_Icons/Role=Bot.png" },
  Support: { label: "Support", icon: "/Role_Icons/Role=Support.png" },
  Unknown: { label: "Unknown", icon: "" },
};
