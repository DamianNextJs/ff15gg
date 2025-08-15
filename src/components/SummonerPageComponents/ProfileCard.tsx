import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { rankBorderColors } from "@/lib/rankBorderColors";
import { toNormalCase } from "@/helper/toNormalCase";
import { getRankData } from "@/helper/getRankData";
import { SummonerData } from "@/types/riot";
import Image from "next/image";

export default function ProfileCard({ data }: { data: SummonerData }) {
  const version = useLatestDDragonVersion() ?? "13.13.1";
  const iconId = data?.summoner?.profileIconId ?? 0;
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;

  const tier = toNormalCase(
    getRankData(data.ranked || [], "solo")?.tier ??
      getRankData(data.ranked || [], "flex")?.tier ??
      ""
  );
  const borderColor = rankBorderColors[tier];

  return (
    <section className="flex items-center gap-3">
      <div className="relative w-fit">
        <Image
          src={profileIconUrl}
          alt="profile icon"
          width={80}
          height={80}
          className="border-2  rounded-md"
          style={{ borderColor }}
        />

        <div
          className="absolute -top-0.5 bg-bg border-2 $ left-1/2 -translate-1/2 rounded-md text-xs px-2 py-0.5"
          style={{ borderColor }}
        >
          {data.summoner.summonerLevel}
        </div>
      </div>
      <div className="text-xl ">
        <span className="truncate max-w-35">{data.riotAccount.gameName} </span>
        <span className="ms-1 text-subtle">#{data.riotAccount.tagLine}</span>
      </div>
    </section>
  );
}
