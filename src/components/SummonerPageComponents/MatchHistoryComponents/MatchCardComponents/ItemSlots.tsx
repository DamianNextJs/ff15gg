import { useVersion } from "@/context/VersionContext";
import { ParticipantData } from "@/types/riot";
import Image from "next/image";

export default function ItemSlots({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  const version = useVersion();
  const wardIcon = myParticipant["item6"];
  const wardIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${wardIcon}.png`;

  return (
    <div className="flex gap-1">
      <div className="flex lg:grid lg:grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => {
          const itemId =
            myParticipant[`item${i}` as keyof typeof myParticipant];
          const itemIconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`;

          return (
            <div key={i}>
              {itemId ? (
                <Image
                  src={itemIconUrl}
                  alt="item"
                  width={21}
                  height={21}
                  className="rounded-sm"
                  unoptimized
                />
              ) : (
                <div className="size-5 bg-white/10 rounded-sm" />
              )}
            </div>
          );
        })}
      </div>
      <div className="shrink-0">
        {wardIcon ? (
          <Image
            src={wardIconUrl}
            alt="item"
            width={21}
            height={21}
            className="rounded-sm "
            unoptimized
          />
        ) : (
          <div className="size-5 bg-white/10 rounded-sm" />
        )}
      </div>
    </div>
  );
}
