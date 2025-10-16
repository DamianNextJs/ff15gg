import { useState } from "react";
import PostGame from "./components/postgametab/PostGame";
import PerformanceTab from "./components/PerformanceTab";
import ItemBuild from "./components/itembuildtab/ItemBuild";

const tabs: ("Post Game" | "Performance" | "Item Build")[] = [
  "Post Game",
  "Performance",
  "Item Build",
];

export default function MatchDetail() {
  const [tab, setTab] = useState<"Post Game" | "Performance" | "Item Build">(
    "Post Game"
  );
  return (
    <div className="bg-accent/30 p-2 -mt-2  rounded-b-md border-t border-accent ">
      <div className="border-b border-accent -mx-2 pb-2 flex justify-around text-sm lg:text-base font-medium">
        {tabs.map((t) => (
          <button
            key={t}
            className={`border-b-2  ${
              tab === t ? "border-primary text-primary" : "border-transparent"
            } p-1 hover:border-primary  cursor-pointer`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Post Game" && <PostGame />}
      {tab === "Performance" && <PerformanceTab />}
      {tab === "Item Build" && <ItemBuild />}
    </div>
  );
}
