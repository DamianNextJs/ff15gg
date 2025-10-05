import Image from "next/image";
import { getRuneData } from "@/utils/playerLoadout";

export default function RuneTreeHeader({ runeStyle }: { runeStyle: number }) {
  const { data: runeTreeData, icon: runeTreeIcon } = getRuneData(runeStyle);

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
