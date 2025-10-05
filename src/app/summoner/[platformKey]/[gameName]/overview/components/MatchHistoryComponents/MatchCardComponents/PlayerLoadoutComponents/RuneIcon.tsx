import Tooltip from "@/components/Tooltip";
import { RuneInfo } from "@/types/rune";
import Image from "next/image";
import RuneTooltip from "./RuneTooltip";

interface RuneIconProps {
  sm?: boolean;
  runeData?: RuneInfo;
  iconUrl?: string;
}

export default function RuneIcon({ sm, runeData, iconUrl }: RuneIconProps) {
  if (!runeData || !iconUrl)
    return (
      <div className={`${sm ? "size-4" : "size-6"} bg-white/10 rounded-xs`} />
    );
  return (
    <Tooltip content={<RuneTooltip rune={runeData} />}>
      <div className={`${sm ? "size-4" : "size-6"} relative`}>
        <Image
          src={iconUrl}
          fill
          alt={runeData.name}
          className="bg-white/10 rounded-xs p-0.5"
        />
      </div>
    </Tooltip>
  );
}
