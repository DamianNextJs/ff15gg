import { useVersion } from "@/context/VersionContext";
import { getChampionById } from "@/helper";
import { ChampionMastery } from "@/types/riot";
import Image from "next/image";
import { Key } from "react";

export default function ChampMasteryCard({
  championMastery,
}: {
  championMastery: ChampionMastery[];
}) {
  const version = useVersion();
  const champIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Champion Mastery
      </h2>
      <div className="flex justify-around mt-4">
        {championMastery.map((c: ChampionMastery, key: Key) => {
          if (!c.championLevel) return null;
          //FOR ICON
          const champ = getChampionById(c.championId);

          return (
            <div
              key={key}
              className="flex flex-col items-center gap-0.5 text-xs"
            >
              <div>
                <Image
                  src={`${champIconUrl}${champ?.image}`}
                  width={40}
                  height={40}
                  alt="champ icon"
                  unoptimized
                />
              </div>
              <span className="font-medium lg:text-sm">{champ?.name}</span>
              <span className="text-subtle">Lvl {c.championLevel}</span>
              <span className=" text-subtle">
                {c.championPoints.toLocaleString()} pts
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
