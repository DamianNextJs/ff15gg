import { useVersion } from "@/context/VersionContext";
import { ParticipantData } from "@/types/riot";
import Image from "next/image";

export default function ItemSlots({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  const version = useVersion();
  return (
    <div className="flex gap-1">
      {Array.from({ length: 7 }).map((_, i) => {
        const itemId = myParticipant[`item${i}` as keyof typeof myParticipant];
        const itemIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;

        return (
          <div key={i}>
            {itemId ? (
              <Image
                src={itemIconUrl}
                alt="item"
                width={20}
                height={20}
                className="rounded-sm"
              />
            ) : (
              <div className="size-5 bg-white/10 rounded-sm"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
