import Tooltip from "@/components/Tooltip";
import { DDragon } from "@/utils/ddragon";
import rawItemsData from "@/lib/data/itemFiltered.json";
import { ItemsData } from "@/types/item";
import Image from "next/image";
import ItemTooltip from "./ItemTooltip";

const itemsData: ItemsData = rawItemsData;

export default function ItemIcon({
  itemId,
  sm,
  lg,
  sold,
  count,
}: {
  itemId: number;
  sm?: boolean;
  lg?: boolean;
  sold?: boolean;
  count?: number;
}) {
  const EmptySlot = (
    <div
      className={` ${
        sm ? "size-4" : lg ? "size-7" : "size-5.5"
      } bg-white/10 rounded-sm`}
    />
  );

  if (!itemId) return EmptySlot;

  const itemData = itemsData[String(itemId)];

  const itemIconUrl = DDragon.itemIcon(itemId);

  return (
    <Tooltip content={<ItemTooltip item={itemData} />}>
      <div
        className={`relative ${sm ? "size-4" : lg ? "size-7" : "size-5.5"} `}
      >
        <Image
          src={itemIconUrl}
          alt="item icon"
          fill
          className={`rounded-sm ${sold ? "opacity-30" : ""}`}
        />
        {count && count > 1 && (
          <div className="absolute -bottom-0.5 -right-0.5 text-xs bg-accent px-1 rounded-full pointer-events-none">
            {count}
          </div>
        )}
        {sold && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`size-4 absolute bottom-0 right-0 text-red-500`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    </Tooltip>
  );
}
