"use client";
import { useDropDown } from "@/hooks/useDropdown";
import { queueMap } from "@/lib/maps/queueMap";
import { SetStateAction, Dispatch } from "react";

interface QueueSelectorProps {
  currentQueue: number | "all";
  setCurrentQueue: Dispatch<SetStateAction<number | "all">>;
}

export default function QueueSelector({
  currentQueue,
  setCurrentQueue,
}: QueueSelectorProps) {
  const { open, setOpen, ref } = useDropDown();

  return (
    <div ref={ref} className="relative text-sm lg:text-base z-1">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <p className="w-25 text-end">
          {currentQueue === "all" ? "All Matches" : queueMap[currentQueue]}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-5 transition-transform duration-200 ease ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {open && (
        <div className="absolute bg-accent rounded-md top-7.5 lg:top-9 right-5 cursor-pointer text-sm overflow-hidden text-center w-25">
          <div
            className={`${
              currentQueue === "all" ? "bg-subtle/15" : ""
            } p-2   hover:bg-subtle/15`}
            onClick={() => {
              setCurrentQueue("all");
              setOpen(!open);
            }}
          >
            All Matches
          </div>
          {Object.entries(queueMap).map(([queueId, name]) => {
            return (
              <div
                key={queueId}
                className={`${
                  currentQueue === Number(queueId) ? "bg-subtle/15" : ""
                } p-2  hover:bg-subtle/15 `}
                onClick={() => {
                  setCurrentQueue(Number(queueId));
                  setOpen(!open);
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
