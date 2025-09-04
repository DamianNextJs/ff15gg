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
      <div className="flex justify-around mt-3">
        {championMastery.map((c: ChampionMastery, key: Key) => {
          if (!c.championLevel) return null;
          //FOR ICON
          const champ = getChampionById(c.championId);

          return (
            <div key={key} className="flex flex-col items-center gap-0.5">
              <div>
                <Image
                  src={`${champIconUrl}${champ?.image}`}
                  width={40}
                  height={40}
                  alt="champ icon"
                />
              </div>
              <div className="text-sm ">Lvl {c.championLevel}</div>
              <div className="text-xs text-subtle">
                {c.championPoints.toLocaleString()} pts
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
