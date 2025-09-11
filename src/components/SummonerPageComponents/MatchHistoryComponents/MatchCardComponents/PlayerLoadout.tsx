import { ParticipantData } from "@/types/riot";
import Image from "next/image";
import { SummonerSpellMap } from "@/lib/maps/summonerSpellMap";
import { runeMap } from "@/lib/maps/runeMap";
import { DDragon } from "@/helper/utils/ddragon";

export default function PlayerLoadout({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  //ICONS - PLAYER LOADOUT
  const champIconUrl = DDragon.championIcon(myParticipant.championName);

  const summoner1 = SummonerSpellMap[myParticipant?.summoner1Id];
  const summoner1Icon = DDragon.summonerSpell(summoner1);
  const summoner2 = SummonerSpellMap[myParticipant?.summoner2Id];
  const summoner2Icon = DDragon.summonerSpell(summoner2);

  const keyStone = runeMap[myParticipant.perks.styles[0].selections[0].perk];
  const keyStoneIcon = DDragon.runeIcon(keyStone.icon);
  const subStyle = runeMap[myParticipant.perks.styles[1].style];
  const subStyleIcon = DDragon.runeIcon(subStyle.icon);
  const champLevel = myParticipant.champLevel;

  return (
    <div className="grid grid-cols-4 gap-1 max-w-fit">
      {/* Champ Icon */}
      <div className="col-span-2 relative  h-13 w-13">
        <Image
          src={champIconUrl}
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
          src={summoner1Icon}
          height={23}
          width={23}
          alt="summonerspell icon"
        />
        <Image
          src={summoner2Icon}
          height={23}
          width={23}
          alt="summonerspell icon"
        />
      </div>
      {/* RUNE ICONS */}
      {keyStoneIcon && subStyleIcon ? (
        <div className="col-span-1 flex flex-col gap-1">
          <Image
            src={keyStoneIcon}
            height={23}
            width={23}
            alt="rune icon"
            className="bg-white/10 rounded-sm p-0.5"
          />
          <Image
            src={subStyleIcon}
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
