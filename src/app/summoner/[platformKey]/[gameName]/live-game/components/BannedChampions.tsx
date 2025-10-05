import { BannedChampion } from "@/types/live-game";
import Image from "next/image";
import { getChampionById } from "@/helper/getChampionById";
import { DDragon } from "@/utils/ddragon";

export default function BannedChampions({
  bannedChampions,
  sm,
}: {
  bannedChampions: BannedChampion[];
  sm?: boolean;
}) {
  if (!bannedChampions) return null;
  return (
    <div className="flex justify-between">
      {[100, 200].map((teamId) => (
        <div className="flex gap-1 lg:gap-2" key={teamId}>
          {bannedChampions
            .filter((b) => b.teamId === teamId)
            .sort((a, b) => a.pickTurn - b.pickTurn)
            .map((bannedChampion, i) => {
              const noBan = bannedChampion.championId === -1;

              // Champion Icon or fallback
              let champIcon;
              if (noBan) {
                champIcon = "/no-icon.jpg";
              } else {
                const champ = getChampionById(bannedChampion.championId);
                champIcon = champ ? DDragon.championIcon(champ.id) : null;
              }

              if (!champIcon) return null;
              return (
                <div
                  className={`relative ${
                    sm ? "size-6.5" : "size-6.5 lg:size-8"
                  } `}
                  key={i}
                >
                  <Image
                    src={champIcon}
                    alt="Champ Icon"
                    fill
                    className={`${
                      sm
                        ? "border-subtle"
                        : teamId === 100
                        ? "border-blue-500"
                        : "border-red-500"
                    } border rounded-md`}
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className={`${
                      sm ? "size-3" : "lg:size-3.5"
                    }  absolute left-1/2 -translate-x-1/2 -bottom-1 bg-black rounded-full opacity-80`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.05 3.05a7 7 0 1 1 9.9 9.9 7 7 0 0 1-9.9-9.9Zm1.627.566 7.707 7.707a5.501 5.501 0 0 0-7.707-7.707Zm6.646 8.768L3.616 4.677a5.501 5.501 0 0 0 7.707 7.707Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
