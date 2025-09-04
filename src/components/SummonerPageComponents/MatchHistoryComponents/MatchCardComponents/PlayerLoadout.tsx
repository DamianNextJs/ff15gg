import { useVersion } from "@/context/VersionContext";
import { Rune } from "@/lib/runes";
import Image from "next/image";

type Props = {
  summoner1Icon: string;
  summoner2Icon: string;
  keyStoneIcon: Rune;
  subStyleIcon: Rune;
  champIconUrl: string;
  champLevel: number;
};

export default function PlayerLoadout({
  summoner1Icon,
  summoner2Icon,
  keyStoneIcon,
  subStyleIcon,
  champIconUrl,
  champLevel,
}: Props) {
  const version = useVersion();
  const summonerSpellIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`;
  return (
    <div className="grid grid-cols-4 gap-1 max-w-fit">
      {/* Champ Icon */}
      <div className="col-span-2 relative size-13">
        <Image src={`${champIconUrl}`} fill alt="champ icon" />
        <span className="text-xs font-medium absolute right-0 bottom-0 bg-accent px-0.5">
          {champLevel}
        </span>
      </div>
      {/* SUMMONER SPELL ICONS */}
      <div className="col-span-1 flex flex-col gap-1">
        <Image
          src={`${summonerSpellIconUrl}${summoner1Icon}.png`}
          height={23}
          width={23}
          alt="summonerspell icon"
        />
        <Image
          src={`${summonerSpellIconUrl}${summoner2Icon}.png`}
          height={23}
          width={23}
          alt="summonerspell icon"
        />
      </div>
      {/* RUNE ICONS */}
      <div className="col-span-1 flex flex-col gap-1">
        <Image
          src={`/${keyStoneIcon.icon}`}
          height={23}
          width={23}
          alt="rune icon"
          className="bg-white/10 rounded-sm p-0.5"
        />
        <Image
          src={`/${subStyleIcon.icon}`}
          height={23}
          width={23}
          alt="rune icon"
          className="bg-white/10 rounded-sm p-1"
        />
      </div>
    </div>
  );
}
