import Tooltip from "@/components/Tooltip";
import { Rune } from "@/types/data";
import { getRuneById, getRuneTreeById } from "@/utils/data";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";

interface RuneIconProps {
  sm?: boolean;
  runeId: number;
  isTree?: boolean;
}

export function RuneIcon({ sm, runeId, isTree }: RuneIconProps) {
  if (!runeId)
    return (
      <div className={`${sm ? "size-4" : "size-6"} bg-white/10 rounded-xs`} />
    );

  const runeData = isTree ? getRuneTreeById(runeId) : getRuneById(runeId);
  const runeIcon = DDragon.runeIcon(runeData.icon);

  return (
    <Tooltip content={<RuneTooltip rune={runeData} />}>
      <div className={`${sm ? "size-4" : "size-6"} relative`}>
        <Image
          src={runeIcon}
          fill
          alt={runeData.name}
          className="bg-white/10 rounded-xs p-0.5"
        />
      </div>
    </Tooltip>
  );
}

export function RuneTooltip({ rune }: { rune: Rune }) {
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
