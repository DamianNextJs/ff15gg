"use client";

import { regionMap, type RegionKey } from "@/lib/maps/regionMap";
import { useDropDown } from "../hooks/useDropdown";

export default function RegionSelect({
  value,
  onChange,
  onOpen, // optional callback when dropdown opens
}: {
  value: RegionKey;
  onChange: (region: RegionKey) => void;
  onOpen?: () => void;
}) {
  const { open, setOpen, ref } = useDropDown();

  const toggleDropdown = () => {
    const newOpenState = !open;
    setOpen(newOpenState);

    // notify parent if opening
    if (newOpenState && onOpen) onOpen();
  };

  return (
    <div
      ref={ref}
      className="text-white font-bold text-xs lg:text-sm relative cursor-pointer w-12 text-center"
    >
      {/* Selected */}
      <div
        onClick={toggleDropdown}
        className={`${regionMap[value].color} p-1 rounded-xs`}
      >
        {regionMap[value].label}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 bg-white mt-7 rounded p-2 space-y-3 z-20">
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
