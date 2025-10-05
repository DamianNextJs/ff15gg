import ItemIcon from "../../../ItemSlotComponents/ItemIcon";
import { GroupedItem } from "./ItemOrder";

export default function ItemMinuteBlock({
  minute,
  items,
  isLast,
}: {
  minute: number;
  items: GroupedItem[];
  isLast: boolean;
}) {
  return (
    <div className="flex mt-1.5">
      <div className="flex flex-col">
        <div className="flex bg-subtle/10 rounded-sm gap-2 p-1.5">
          {items.map(({ item, count, sold }, i) => (
            <ItemIcon
              key={i}
              itemId={item.itemId || 0}
              lg={true}
              sold={sold}
              count={count}
            />
          ))}
        </div>
        <p className="text-[10px] text-subtle font-medium text-center">
          {minute} min
        </p>
      </div>
      <div
        className={`h-3 w-3 bg-subtle/10 mt-3.5 ${isLast ? "hidden" : ""}`}
      />
    </div>
  );
}
