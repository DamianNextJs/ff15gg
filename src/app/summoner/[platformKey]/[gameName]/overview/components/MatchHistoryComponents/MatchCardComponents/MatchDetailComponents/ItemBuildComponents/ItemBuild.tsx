import { useMatchContext } from "../../../../../contexts/MatchContext";
import RunePage from "./RuneTreeComponents/RunePage";

export default function ItemBuild() {
  const { myParticipant } = useMatchContext();
  return (
    <div>
      <RunePage runes={myParticipant.perks} />
    </div>
  );
}
