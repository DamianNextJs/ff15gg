import { MatchData, ParticipantData } from "@/types/riot";
import { runeMap } from "@/lib/runes";
import { SummonerSpellMap } from "@/lib/summonerSpellMap";
import { useVersion } from "@/context/VersionContext";
import PlayerLoadout from "./PlayerLoadout";
import GameInfo from "./GameInfo";
import ItemSlots from "./ItemSlots";
import PlayerStats from "./PlayerStats";

export default function MatchCard({
  myParticipant,
  match,
}: {
  myParticipant: ParticipantData;
  match: MatchData;
}) {
  const version = useVersion();

  //ICONS - PLAYER LOADOUT
  const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${myParticipant?.championName}.png`;
  const summoner1Icon = SummonerSpellMap[myParticipant?.summoner1Id];
  const summoner2Icon = SummonerSpellMap[myParticipant?.summoner2Id];
  const keyStoneIcon =
    runeMap[myParticipant.perks.styles[0].selections[0].perk];
  const subStyleIcon = runeMap[myParticipant.perks.styles[1].style];

  const champLevel = myParticipant.champLevel;

  //Game Info
  const gameDuration = match.info.gameDuration;

  return (
    <div
      className={`${
        myParticipant?.win ? "bg-win/90" : "bg-lose/90"
      } flex flex-col rounded-md mt-2 p-2 gap-1`}
    >
      <GameInfo isWin={myParticipant.win} match={match} />
      <div className="flex justify-between">
        <PlayerLoadout
          summoner1Icon={summoner1Icon}
          summoner2Icon={summoner2Icon}
          keyStoneIcon={keyStoneIcon}
          subStyleIcon={subStyleIcon}
          champIconUrl={champIconUrl}
          champLevel={champLevel}
        />
        <div className="flex flex-col justify-end items-end gap-2">
          <ItemSlots myParticipant={myParticipant} />
          <PlayerStats
            myParticipant={myParticipant}
            gameDuration={gameDuration}
          />
        </div>
      </div>
    </div>
  );
}
