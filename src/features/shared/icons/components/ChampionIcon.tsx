import { getChampionById } from "@/utils/data";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";

interface ChampionIconProps {
  championId: number;
  level?: number;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  border?: boolean;
}

const sizeClasses: Record<ChampionIconProps["size"], string> = {
  xs: "size-4", // 16
  sm: "size-7.5", // 30
  md: "size-9", // 36
  lg: "size-10", //40
  xl: "size-13", //52
};

export default function ChampionIcon({
  championId,
  level = 0,
  size,
  border,
}: ChampionIconProps) {
  const champ = getChampionById(championId);
  const champIcon = DDragon.championIcon(champ.id);

  return (
    <div
      className={`relative rounded-xs ${sizeClasses[size]} ${
        border ? "border border-orange-500" : ""
      }`}
    >
      <Image src={champIcon} alt="champ icon" fill />
      {level && (
        <div className="text-[10px] lg:text-xs font-medium absolute rounded-md bottom-0 right-0  bg-accent px-0.5">
          {level}
        </div>
      )}
    </div>
  );
}
