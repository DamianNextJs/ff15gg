import { LiveParticipant } from "@/types/live-game";
import Link from "next/link";
import { createSummonerUrl } from "@/utils/summoner";
import { SummonerSpellIcon } from "@/features/shared/icons/components/SummonerSpellIcon";
import { RuneIcon } from "@/features/shared/icons/components/RuneIcon";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";

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
  const [name, tag] = participant.riotId.split("#");
  const summonerUrl = createSummonerUrl(name, tag);

  return (
    <div
      className={`-mx-4 px-4 py-2 flex items-center gap-3 ${
        position % 2 === 0 ? "bg-secondary" : "bg-accent/50"
      }`}
    >
      <div className="flex items-center gap-1">
        <div className=" mr-0.5">
          <ChampionIcon championId={participant.championId} size={"md"} />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <SummonerSpellIcon summonerSpellId={participant.spell1Id} sm={true} />
          <SummonerSpellIcon summonerSpellId={participant.spell2Id} sm={true} />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <RuneIcon runeId={participant.perks.perkIds[0]} sm={true} />
          <RuneIcon
            runeId={participant.perks.perkSubStyle}
            sm={true}
            isTree={true}
          />
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
