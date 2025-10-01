import Tooltip from "@/components/Tooltip";
import { DDragon } from "@/utils/ddragon";
import itemsData from "@/lib/data/item.json";
import { ItemsData } from "@/types/item";
import Image from "next/image";
import ItemTooltip from "./ItemTooltip";

const typedItemsData = itemsData.data as ItemsData;

export default function ItemIcon({
  itemId,
  sm,
}: {
  itemId: number;
  sm: boolean;
}) {
  const EmptySlot = (
    <div className={` ${sm ? "size-4" : "size-5.5"} bg-white/10 rounded-sm`} />
  );

  if (!itemId) return EmptySlot;

  const itemData = typedItemsData[String(itemId)];

  const itemIconUrl = DDragon.itemIcon(itemId);

  return (
    <Tooltip content={<ItemTooltip item={itemData} />}>
      <div className={`relative ${sm ? "size-4" : "size-5.5"}`}>
        <Image
          src={itemIconUrl}
          alt={itemData.name}
          fill
          className="rounded-sm"
        />
      </div>
    </Tooltip>
  );
}
