import { EventData } from "@/types/match";
import ItemMinuteBlock from "./ItemMinuteBlock";
import SectionHeading from "@/components/SectionHeading";

export interface GroupedItem {
  item: EventData;
  count: number;
  sold: boolean;
}

function groupItemEventsByMinute(
  events: EventData[]
): Map<number, GroupedItem[]> {
  const eventsByMinute = new Map<number, GroupedItem[]>();

  for (const event of events) {
    const id = event.type === "ITEM_UNDO" ? event.beforeId : event.itemId;
    if (!id) continue;

    const minute = Math.floor(event.timestamp / 1000 / 60);

    if (!eventsByMinute.has(minute)) eventsByMinute.set(minute, []);
    const items = eventsByMinute.get(minute);
    if (!items) continue;

    const existing = items.find((i) => i.item.itemId === id);

    if (event.type === "ITEM_UNDO") {
      if (existing) {
        existing.count -= 1;

        if (existing.count <= 0) {
          items.splice(items.indexOf(existing), 1);
        }
      }
    } else if (existing) {
      existing.count += 1;
      if (event.type === "ITEM_SOLD") {
        existing.sold = true;
        existing.count -= 1;
      }
    } else {
      items.push({
        item: event,
        count: 1,
        sold: event.type === "ITEM_SOLD",
      });
    }
  }

  return eventsByMinute;
}

export default function ItemOrder({ itemEvents }: { itemEvents: EventData[] }) {
  const eventsByMinute = groupItemEventsByMinute(itemEvents);
  return (
    <div>
      <SectionHeading>Items</SectionHeading>
      <div className="mt-3 flex w-full justify-center">
        <div className="flex flex-wrap w-141.5">
          {Array.from(eventsByMinute.entries()).map(
            ([minute, items], index, arr) => {
              return (
                <ItemMinuteBlock
                  key={index}
                  minute={minute}
                  items={items}
                  isLast={index === arr.length - 1}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
