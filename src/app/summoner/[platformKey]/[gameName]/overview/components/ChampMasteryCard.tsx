import { getChampionById } from "@/helper/getChampionById";
import { DDragon } from "@/utils/ddragon";
import { ChampionMastery } from "@/types/summoner";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export default function ChampMasteryCard({
  championMastery,
}: {
  championMastery: ChampionMastery[];
}) {
  const topChampionId = championMastery[0]?.championId;
  const reordered = [
    championMastery[1] || null, // left
    championMastery[0], // top
    championMastery[2] || null, // right
  ].filter(Boolean); // remove nulls if <3 champions
  return (
    <section className="mt-3 bg-secondary rounded-md p-4">
      <SectionHeading text="Champion Mastery" />
      <div className="flex justify-around mt-4">
        {reordered.map((c: ChampionMastery) => {
          if (!c.championLevel) return null;
          const isTop = c.championId === topChampionId;
          const champ = getChampionById(c.championId);
          if (!champ) return null; // skip if no champion found
          const champIcon = DDragon.championIcon(champ.id);
          return (
            <div
              key={c.championId}
              className={`flex flex-col items-center gap-0.5 text-xs ${
                isTop ? "scale-105" : "scale-95"
              }`}
            >
              <div>
                <Image
                  src={champIcon}
                  width={40}
                  height={40}
                  alt="champ icon"
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
