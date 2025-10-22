"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type RegionKey } from "@/lib/maps/regionMap";
import { createSummonerUrl } from "@/utils/summoner";
import RegionSelect from "@/features/shared/dropdowns/components/RegionSelect";
import SearchSuggestions from "./SearchSuggestions";
import { useSidebarDrawer } from "@/components/sidebar/context/SidebarDrawerContext";

type SummonerSearchVariant = "default" | "navbar" | "drawer";

interface SummonerSearchProps {
  variant?: SummonerSearchVariant;
}

export default function SummonerSearch({
  variant = "default",
}: SummonerSearchProps) {
  const isNavbar = variant === "navbar" || variant === "drawer";
  const isDrawer = variant === "drawer";

  const visibilityClasses =
    variant === "navbar" ? "hidden lg:block" : isDrawer ? "lg:hidden" : "";

  const [summonerName, setSummonerName] = useState("");
  const [region, setRegion] = useState<RegionKey>("euw1");
  const [focused, setFocused] = useState(false);
  const { setIsOpen } = useSidebarDrawer();

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const [name, tag] = summonerName.split("#");
    if (!name || !tag) return;

    isDrawer && setIsOpen(false);
    setFocused(false);

    const summonerUrl = createSummonerUrl(name, tag);
    router.push(
      `/summoner/${region}/${encodeURIComponent(summonerUrl)}/overview`
    );
  };

  // Close suggestions when clicking outside the search container
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${visibilityClasses} ${
        isNavbar ? "max-w-125 text-subtle" : "lg:w-175 text-secondary"
      } `}
    >
      <form
        className={`flex justify-between items-center  ${
          isNavbar ? "p-2 bg-secondary" : "p-5 lg:text-xl bg-white"
        }  rounded-md mx-auto `}
        onSubmit={handleSearch}
      >
        <input
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          placeholder="Enter Riot ID"
          className="focus:outline-none w-full"
          onFocus={() => setFocused(true)}
        />
        <RegionSelect
          value={region}
          onChange={setRegion}
          onOpen={() => setFocused(false)}
          isNavbar={isNavbar}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 ms-3 cursor-pointer"
          onClick={handleSearch}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </form>

      <SearchSuggestions
        summonerName={summonerName}
        region={region}
        focused={focused}
        isNavbar={isNavbar}
        isDrawer={isDrawer}
        setFocused={setFocused}
      />
    </div>
  );
}
