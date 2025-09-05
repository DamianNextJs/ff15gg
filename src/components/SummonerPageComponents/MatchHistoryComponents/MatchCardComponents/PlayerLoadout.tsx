import { useVersion } from "@/context/VersionContext";
import { ParticipantData } from "@/types/riot";
import Image from "next/image";
import { SummonerSpellMap } from "@/lib/summonerSpellMap";
import { runeMap } from "@/lib/runes";

export default function PlayerLoadout({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  const version = useVersion();

  //ICONS - PLAYER LOADOUT
  const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${myParticipant?.championName}.png`;
  const summonerSpellIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`;
  const summoner1Icon = SummonerSpellMap[myParticipant?.summoner1Id];
  const summoner2Icon = SummonerSpellMap[myParticipant?.summoner2Id];
  const keyStoneIcon =
    runeMap[myParticipant.perks.styles[0].selections[0].perk];
  const subStyleIcon = runeMap[myParticipant.perks.styles[1].style];

  const champLevel = myParticipant.champLevel;

  return (
    <div className="grid grid-cols-4 gap-1 max-w-fit">
      {/* Champ Icon */}
      <div className="col-span-2 relative  h-13 w-13">
        <Image
          src={`${champIconUrl}`}
          width={52}
          height={52}
          alt={myParticipant.championName}
        />
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
      {keyStoneIcon && subStyleIcon ? (
        <div className="col-span-1 flex flex-col gap-1">
          <Image
            src={`/${keyStoneIcon?.icon}`}
            height={23}
            width={23}
            alt="rune icon"
            className="bg-white/10 rounded-sm p-0.5"
          />
          <Image
            src={`/${subStyleIcon?.icon}`}
            height={23}
            width={23}
            alt="rune icon"
            className="bg-white/10 rounded-sm p-1"
          />
        </div>
      ) : null}
    </div>
  );
}
