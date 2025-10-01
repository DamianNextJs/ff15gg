import { ItemInfo } from "@/types/item";

export default function ItemTooltip({ item }: { item: ItemInfo }) {
  return (
    <div className="text-xs ">
      <strong className="text-blue-500 text-sm">{item.name}</strong>
      <div className="my-2">{item.plaintext}</div>
      <div dangerouslySetInnerHTML={{ __html: item.description }} />
      <div className="text-orange-400 mt-2">Cost: {item.gold.total} gold</div>
    </div>
  );
}
