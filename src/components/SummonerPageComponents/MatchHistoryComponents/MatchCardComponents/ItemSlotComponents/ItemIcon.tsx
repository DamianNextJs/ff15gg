import Tooltip from "@/components/UI/Tooltip";
import { DDragon } from "@/helper/utils/ddragon";
import itemsData from "@/lib/data/item.json";
import { ItemsData } from "@/types/item";
import Image from "next/image";
import { ItemTooltip } from "./ItemTooltip";

interface ItemIconProps {
  itemId?: number;
}

const typedItemsData = itemsData.data as ItemsData;

export const ItemIcon = ({ itemId }: ItemIconProps) => {
  const EmptySlot = <div className="size-5.5 bg-white/10 rounded-sm" />;

  if (!itemId) return EmptySlot;

  const itemData = typedItemsData[String(itemId)];

  const itemIconUrl = DDragon.itemIcon(itemId);
  const imageProps = { width: 22, height: 22, className: "rounded-sm" };

  return (
    <Tooltip content={<ItemTooltip item={itemData} />}>
      <Image src={itemIconUrl} alt={itemData.name} {...imageProps} />
    </Tooltip>
  );
};
