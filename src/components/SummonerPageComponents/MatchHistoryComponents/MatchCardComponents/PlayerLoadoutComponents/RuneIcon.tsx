import Tooltip from "@/components/UI/Tooltip";
import { RuneInfo } from "@/types/rune";
import Image from "next/image";
import { RuneTooltip } from "./RuneTooltip";

export const RuneIcon = (runeData?: RuneInfo, iconUrl?: string) => {
  if (!runeData || !iconUrl)
    return <div className="size-5 bg-white/10 rounded-sm" />;
  return (
    <Tooltip content={<RuneTooltip rune={runeData} />}>
      <Image
        src={iconUrl}
        width={23}
        height={23}
        alt={runeData.name}
        className="bg-white/10 rounded-sm p-0.5"
      />
    </Tooltip>
  );
};
