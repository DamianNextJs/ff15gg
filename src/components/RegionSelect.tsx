"use client";

import { useEffect, useRef, useState } from "react";
import { regionMap, type RegionKey } from "../lib/region";

export default function RegionSelect({
  value,
  onChange,
}: {
  value: RegionKey;
  onChange: (region: RegionKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  //close dropdown if click happens outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="text-white font-bold text-xs lg:text-sm relative cursor-pointer w-12 text-center "
    >
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className={`${regionMap[value].color} p-1 rounded-xs`}
      >
        {regionMap[value].label}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-white mt-7 rounded p-2 space-y-3">
          {Object.entries(regionMap).map(([key, region]) => (
            <div
              key={key}
              onClick={() => {
                onChange(key as RegionKey);
                setOpen(false);
              }}
              className={`${region.color} p-1 rounded-xs hover:scale-105 transition duration-75 ease-in`}
            >
              {region.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
