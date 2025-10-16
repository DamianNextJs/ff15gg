import { Dispatch, SetStateAction } from "react";

import { RoleType } from "@/types/summoner";
import Tooltip from "@/components/Tooltip";
import QueueSelector from "@/features/shared/dropdowns/components/QueueSelector";
import RoleSelector from "@/features/shared/dropdowns/components/RoleSelector";

interface ChampionStatsFiltersProps {
  currentQueue: number | "all";
  setCurrentQueue: Dispatch<SetStateAction<number | "all">>;
  currentRole: RoleType | "all";
  setCurrentRole: Dispatch<SetStateAction<RoleType | "all">>;
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
}

export default function ChampionStatsFilters({
  currentQueue,
  setCurrentQueue,
  currentRole,
  setCurrentRole,
  searchFilter,
  setSearchFilter,
}: ChampionStatsFiltersProps) {
  return (
    <div className="bg-accent/50 flex items-center justify-center lg:justify-start p-2 lg:p-4 gap-2 lg:gap-4 text-sm lg:text-base rounded-t-md">
      <div className="flex items-center gap-2">
        <p className="hidden lg:block">Filters</p>
        <Tooltip
          content={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Tooltip>
      </div>
      <div className="bg-accent rounded-md p-2">
        <QueueSelector
          currentQueue={currentQueue}
          setCurrentQueue={setCurrentQueue}
        />
      </div>
      {currentQueue !== 450 && (
        <div className="bg-accent rounded-md p-2">
          <RoleSelector
            currentRole={currentRole}
            setCurrentRole={setCurrentRole}
          />
        </div>
      )}
      <div className="relative">
        <input
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Search Champion..."
          className="bg-accent p-2.5 pr-8 rounded-md outline-none hover:bg-subtle/10 w-full text-sm hidden lg:block"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 hidden lg:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
}
