import { DDragon } from "@/helper/utils/ddragon";
import { ParticipantData } from "@/types/riot";
import Image from "next/image";

export default function ItemSlots({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  const wardIconId =
    typeof myParticipant.item6 === "number" ? myParticipant.item6 : 0;

  const wardIconUrl = DDragon.itemIcon(wardIconId);

  return (
    <div className="flex gap-1">
      <div className="flex lg:grid lg:grid-cols-3 gap-1">
        {Array.from({ length: 6 }).map((_, i) => {
          const itemIdRaw = myParticipant[`item${i}` as keyof ParticipantData];
          const itemId = typeof itemIdRaw === "number" ? itemIdRaw : 0;

          const itemIconUrl = DDragon.itemIcon(itemId);

          return (
            <div key={i}>
              {itemId ? (
                <Image
                  src={itemIconUrl}
                  alt="item"
                  width={21}
                  height={21}
                  className="rounded-sm"
                />
              ) : (
                <div className="size-5 bg-white/10 rounded-sm" />
              )}
            </div>
          );
        })}
      </div>
      <div className="shrink-0">
        {wardIconId ? (
          <Image
            src={wardIconUrl}
            alt="item"
            width={21}
            height={21}
            className="rounded-sm "
          />
        ) : (
          <div className="size-5 bg-white/10 rounded-sm" />
        )}
      </div>
    </div>
  );
}
