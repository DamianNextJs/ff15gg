import { EventData } from "@/types/match";
import ChampionSpellSlots from "./ChampionSpellSlots";
import LevelUpSlots from "./LevelUpSlots";
import SectionHeading from "@/components/SectionHeading";

export default function SkillOrder({
  participantChampionId,
  levelUpEvents,
}: {
  levelUpEvents: EventData[];
  participantChampionId: number;
}) {
  return (
    <div>
      <SectionHeading text="Skill Order" />
      <div className="mt-3 overflow-x-auto lg:overflow-visible">
        <div className="min-w-fit flex gap-2 justify-start lg:justify-center pb-3 lg:p-0">
          <ChampionSpellSlots participantChampionId={participantChampionId} />
          <LevelUpSlots levelUpEvents={levelUpEvents} />
        </div>
      </div>
    </div>
  );
}
