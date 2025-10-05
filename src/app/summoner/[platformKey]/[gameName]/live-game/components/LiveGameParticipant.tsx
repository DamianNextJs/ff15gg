import { getChampionById } from "@/helper/getChampionById";
import { LiveParticipant } from "@/types/live-game";
import { DDragon } from "@/utils/ddragon";
import { getRuneData, getSummonerSpellData } from "@/utils/playerLoadout";
import Image from "next/image";
import SummonerSpellIcon from "../../overview/components/MatchHistoryComponents/MatchCardComponents/PlayerLoadoutComponents/SummonerSpellIcon";
import RuneIcon from "../../overview/components/MatchHistoryComponents/MatchCardComponents/PlayerLoadoutComponents/RuneIcon";
import Link from "next/link";
import { createSummonerUrl } from "@/helper/summoner";

export default function LiveGameParticipant({
  participant,
  myParticipant,
  position,
  platform,
}: {
  participant: LiveParticipant;
  myParticipant: boolean;
  position: number;
  platform: string;
}) {
  const champ = getChampionById(participant.championId);
  if (!champ) return null;
  const championIcon = DDragon.championIcon(champ.id);

  const { data: summoner1Data, icon: summoner1Icon } = getSummonerSpellData(
    participant.spell1Id
  );
  const { data: summoner2Data, icon: summoner2Icon } = getSummonerSpellData(
    participant.spell2Id
  );

  const { data: keyStoneData, icon: keyStoneIcon } = getRuneData(
    participant.perks.perkIds[0]
  );
  const { data: subStyleData, icon: subStyleIcon } = getRuneData(
    participant.perks.perkSubStyle
  );

  const [name, tag] = participant.riotId.split("#");
  const summonerUrl = createSummonerUrl(name, tag);

  return (
    <div
      className={`-mx-4 px-4 py-2 flex items-center gap-3 ${
        position % 2 === 0 ? "bg-secondary" : "bg-accent/50"
      }`}
    >
      <div className="flex items-center gap-1">
        <div className="relative size-9 mr-0.5">
          <Image src={championIcon} alt="Champ Icon" fill />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <SummonerSpellIcon
            spellData={summoner1Data}
            iconUrl={summoner1Icon}
            sm={true}
          />
          <SummonerSpellIcon
            spellData={summoner2Data}
            iconUrl={summoner2Icon}
            sm={true}
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <RuneIcon runeData={keyStoneData} iconUrl={keyStoneIcon} sm={true} />
          <RuneIcon runeData={subStyleData} iconUrl={subStyleIcon} sm={true} />
        </div>
      </div>
      <Link
        href={`/summoner/${platform}/${encodeURIComponent(
          summonerUrl
        )}/overview`}
        prefetch={false}
        className={`${
          myParticipant ? "pointer-events-none text-orange-500" : ""
        } hover:underline text-sm truncate`}
      >
        {name} #{tag}
      </Link>
    </div>
  );
}
