import Tooltip from "@/components/Tooltip";
import { RuneTooltip } from "@/features/shared/icons/components/RuneIcon";
import { Rune as RuneType } from "@/types/data";

import Image from "next/image";

export default function Rune({
  runeData,
  iconUrl,
  isSelected = false,
  isKeyStone = false,
  isStatShard = false,
}: {
  runeData: RuneType;
  iconUrl: string;
  isSelected?: boolean;
  isKeyStone?: boolean;
  isStatShard?: boolean;
}) {
  return (
    <Tooltip content={<RuneTooltip rune={runeData} />}>
      <div
        className={`relative ${
          isKeyStone
            ? "size-8 lg:size-10"
            : isStatShard
            ? "size-4 lg:size-6"
            : "size-6 lg:size-8"
        }`}
      >
        <Image
          src={iconUrl}
          fill
          alt="rune icon"
          className={`rounded-full 
            ${
              isSelected
                ? "opacity-100 border lg:border-2 border-primary"
                : isStatShard
                ? "opacity-30 saturate-0 bg-white/15"
                : "opacity-30 saturate-0"
            } ${isStatShard ? "lg:p-0.5" : ""}
          `}
        />
      </div>
    </Tooltip>
  );
}
