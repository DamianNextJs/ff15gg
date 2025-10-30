import { ChampionMastery } from "@/types/summoner";
import SectionHeading from "@/components/SectionHeading";
import ChampionIcon from "@/features/shared/icons/components/ChampionIcon";
import { getChampionById } from "@/utils/data";

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
      <SectionHeading>Champion Mastery</SectionHeading>
      <div className="flex justify-around mt-4">
        {reordered.map((c: ChampionMastery) => {
          if (!c.championLevel) return null;
          const isTop = c.championId === topChampionId;
          const championName = getChampionById(c.championId).name;
          return (
            <div
              key={c.championId}
              className={`flex flex-col items-center gap-0.5 text-xs ${
                isTop ? "scale-105" : "scale-95"
              }`}
            >
              <ChampionIcon championId={c.championId} size={"lg"} />
              <span className="font-medium lg:text-sm">{championName}</span>
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
