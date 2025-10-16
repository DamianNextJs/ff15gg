import { ItemIcon } from "@/features/shared/icons/components/ItemIcon";
import { ParticipantData } from "@/types/match";

export default function ItemSlots({
  participant,
  sm,
}: {
  participant: ParticipantData;
  sm: boolean;
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
          <ItemIcon sm={sm} key={key} itemId={participant[key] as number} />
        ))}
      </div>
      <div className="shrink-0">
        <ItemIcon sm={sm} itemId={participant.item6!} />
      </div>
    </div>
  );
}
