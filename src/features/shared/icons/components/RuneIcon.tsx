import Tooltip from "@/components/Tooltip";

import Image from "next/image";
import { RuneInfo } from "../types/rune";

interface RuneIconProps {
  sm?: boolean;
  runeData?: RuneInfo;
  iconUrl?: string;
}

export function RuneIcon({ sm, runeData, iconUrl }: RuneIconProps) {
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

export function RuneTooltip({ rune }: { rune: RuneInfo }) {
  return (
    <div className="text-xs">
      <strong className="text-blue-500 text-sm">{rune.name}</strong>
      {rune.longDesc || rune.shortDesc ? (
        <div
          className="mt-1"
          dangerouslySetInnerHTML={{
            __html: rune.longDesc ?? rune.shortDesc ?? "",
          }}
        />
      ) : null}
    </div>
  );
}
