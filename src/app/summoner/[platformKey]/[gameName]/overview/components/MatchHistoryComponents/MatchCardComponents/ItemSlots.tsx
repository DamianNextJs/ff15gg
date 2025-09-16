import { ParticipantData } from "@/types/riot";
import { ItemIcon } from "./ItemSlotComponents/ItemIcon";

export default function ItemSlots({
  myParticipant,
}: {
  myParticipant: ParticipantData;
}) {
  const itemKeys = [
    "item0",
    "item1",
    "item2",
    "item3",
    "item4",
    "item5",
    "item6",
  ] as const;

  return (
    <div className="flex gap-1">
      <div className="flex lg:grid lg:grid-cols-3 gap-1">
        {itemKeys.slice(0, 6).map((key) => (
          <ItemIcon key={key} itemId={myParticipant[key] as number} />
        ))}
      </div>
      <div className="shrink-0">
        <ItemIcon itemId={myParticipant.item6!} />
      </div>
    </div>
  );
}
