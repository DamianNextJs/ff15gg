import { useLatestDDragonVersion } from "@/hooks/useLatestDDragonVersion";
import { rankBorderColors } from "@/lib/rankBorderColors";
import { toNormalCase } from "@/helper/toNormalCase";
import { getRankData } from "@/helper/getRankData";

export default function ProfileCard({ data }: { data: any }) {
  const version = useLatestDDragonVersion();
  const iconId = data?.summoner?.profileIconId ?? 0;
  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;

  // TODO make border colors actually match league ranks (might have to use style attribute), also maby clean up code abit ALSO PUSH SOME CODE TO GITHUB LIKE WTF LAST COMMIT WAS year ago

  const tier = toNormalCase(
    getRankData(data.ranked, "solo")?.tier ??
      getRankData(data.ranked, "flex")?.tier ??
      ""
  );
  const borderColor = rankBorderColors[tier];

  return (
    <section className="flex items-center gap-3">
      <div className="relative w-fit">
        <img
          src={profileIconUrl}
          alt="profile icon"
          className="size-20 border-2 ${borderColor} rounded-md"
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
