import { EventData } from "@/types/match";
import ChampionSpellSlots from "./ChampionSpellSlots";
import LevelUpSlots from "./LevelUpSlots";

export default function SkillOrder({
  participantChampionId,
  levelUpEvents,
}: {
  levelUpEvents: EventData[];
  participantChampionId: number;
}) {
  return (
    <div>
      <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
        Skill Order
      </h2>
      <div className="mt-3 overflow-x-auto lg:overflow-visible">
        <div className="min-w-fit flex gap-2 justify-start lg:justify-center pb-3 lg:p-0">
          <ChampionSpellSlots participantChampionId={participantChampionId} />
          <LevelUpSlots levelUpEvents={levelUpEvents} />
        </div>
      </div>
    </div>
  );
}
