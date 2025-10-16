import { EventData } from "@/types/match";

export default function LevelUpSlots({
  levelUpEvents,
}: {
  levelUpEvents: EventData[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, row) => (
        // Rows (Slots)
        <div key={row} className="flex gap-1 lg:gap-1.5">
          {Array.from({ length: 18 }).map((_, i) => {
            // Cols
            const levelUp = levelUpEvents[i]?.skillSlot === row + 1;
            return (
              <div
                key={i}
                className={`rounded-sm size-6 flex justify-center items-center text-xs font-medium ${
                  levelUp ? " bg-primary" : "bg-white/10"
                } `}
              >
                {levelUp && i + 1}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
