import { getRuneTreeById } from "@/utils/data";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";

export default function RuneTreeHeader({ runeStyle }: { runeStyle: number }) {
  const runeTreeData = getRuneTreeById(runeStyle);
  const runeTreeIcon = DDragon.runeIcon(runeTreeData.icon);

  return (
    <div className="flex bg-accent p-1.5 rounded-md items-center gap-1 w-full">
      <div className="bg-secondary p-1 rounded-sm">
        <Image
          src={runeTreeIcon}
          alt="rune icon"
          width={25}
          height={25}
          className="p-1"
        />
      </div>
      <p className="text-xs lg:text-sm font-medium">{runeTreeData.name}</p>
    </div>
  );
}
