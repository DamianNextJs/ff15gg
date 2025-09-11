"use client";

import { useCachedSummoners } from "@/hooks/useCachedSummoners";
import { CachedSummoner } from "@/types/riot";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RegionKey } from "@/lib/maps/regionMap";
import LoadingIndicator from "./LoadingIndicator";
import SuggestionItem from "./SuggestionItem";

interface SearchSuggestionsProps {
  summonerName: string;
  region: RegionKey;
}

export default function SearchSuggestions({
  summonerName,
  region,
}: SearchSuggestionsProps) {
  const { results, loading } = useCachedSummoners(summonerName, region);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const ref = useRef<HTMLUListElement>(null);

  // Close suggestions if click happens outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Re-open suggestions when summonerName changes
  useEffect(() => {
    if (summonerName) setOpen(true);
  }, [summonerName]);

  // Delayed loader logic: only show if loading takes longer than 200ms
  useEffect(() => {
    if (!loading) {
      setShowLoader(false);
      return;
    }

    const timeout = setTimeout(() => setShowLoader(true), 200);
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSelectSuggestion = (summoner: CachedSummoner) => {
    router.push(
      `/summoner/${region}/${encodeURIComponent(
        `${summoner.gameName}-${summoner.tagLine}`
      )}`
    );
  };

  // Memoize formatted results to avoid recalculating on every render
  const formattedResults = useMemo(() => results, [results]);

  if (showLoader) return <LoadingIndicator />;
  if (!formattedResults.length || !open) return null;

  return (
    <ul
      ref={ref}
      className="absolute mt-1 w-full bg-white border z-10 rounded-md"
    >
      <h2 className="bg-subtle text-xs lg:text-sm p-2 rounded-t-md">
        Summoner Profile
      </h2>
      {formattedResults.map((s) => (
        <SuggestionItem
          key={s.puuid}
          summoner={s}
          region={region}
          onSelect={handleSelectSuggestion}
        />
      ))}
    </ul>
  );
}
