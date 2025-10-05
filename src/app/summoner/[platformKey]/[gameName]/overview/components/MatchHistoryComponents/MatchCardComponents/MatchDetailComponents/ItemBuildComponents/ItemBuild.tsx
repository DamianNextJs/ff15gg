import { useMatchContext } from "../../../../../contexts/MatchContext";
import ItemOrder from "./ItemOrderComponents/ItemOrder";
import RunePage from "./RunePageComponents/RunePage";
import SkillOrder from "./SkillOrderComponents/SkillOrder";

export default function ItemBuild() {
  const { myParticipant, match } = useMatchContext();

  const myTimeLineParticipant = match.timeLine?.info.participants.find(
    (p) => p.puuid === myParticipant.puuid
  );

  const myEvents = match.timeLine?.info.frames.flatMap((frame) => {
    return frame.events.filter(
      (event) => event.participantId === myTimeLineParticipant?.participantId
    );
  });

  const levelUpEvents = myEvents?.filter((e) => e.type === "SKILL_LEVEL_UP");

  const itemEvents = myEvents?.filter(
    (e) => e.type === "ITEM_PURCHASED" || e.type === "ITEM_SOLD"
  );

  return (
    <div className="p-2 mt-2">
      <RunePage runes={myParticipant.perks} />
      <hr className="-mx-4 my-4 text-white/10" />
      <SkillOrder
        levelUpEvents={levelUpEvents || []}
        participantChampionId={myParticipant.championId}
      />
      <hr className="-mx-4 my-4 text-white/10" />
      <ItemOrder itemEvents={itemEvents || []} />
    </div>
  );
}
