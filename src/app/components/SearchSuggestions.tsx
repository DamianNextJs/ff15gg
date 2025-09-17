"use client";

import { useCachedSummoners } from "@/hooks/useCachedSummoners";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { SummonerData } from "@/types/riot";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RegionKey } from "@/lib/maps/regionMap";
import LoadingIndicator from "./LoadingIndicator";
import SuggestionItem from "./SuggestionItem";
import { createSummonerUrl } from "@/helper/summoner";

interface SearchSuggestionsProps {
  summonerName: string;
  region: RegionKey;
  focused: boolean;
}

export default function SearchSuggestions({
  summonerName,
  region,
  focused,
}: SearchSuggestionsProps) {
  const { results, loading } = useCachedSummoners(summonerName, region);
  const { recent, addRecent } = useRecentSearches();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  // Delayed loader: show only if loading >200ms
  useEffect(() => {
    if (!loading) {
      setShowLoader(false);
      return;
    }
    const timeout = setTimeout(() => setShowLoader(true), 200);
    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSelectSuggestion = (summoner: SummonerData) => {
    addRecent(summoner);
    const summonerUrl = createSummonerUrl(
      summoner.riotAccount.gameName,
      summoner.riotAccount.tagLine
    );
    router.push(
      `/summoner/${summoner.platform}/${encodeURIComponent(
        summonerUrl
      )}/overview`
    );
  };

  const trimmedInput = summonerName.trim();
  // Decide which list to show: recent searches or cached results
  const suggestions: SummonerData[] = useMemo(() => {
    if (!focused) return [];
    if (!trimmedInput) return recent; // show all recent searches
    return results; // show cached search results
  }, [focused, trimmedInput, recent, results]);

  if (showLoader) return <LoadingIndicator />;
  if (!suggestions.length) return null;

  return (
    <ul className="absolute mt-1 w-full bg-white border z-10 rounded-md">
      <h2 className="bg-subtle text-xs lg:text-sm p-2 rounded-t-md">
        {!trimmedInput ? "Recent Searches" : "Summoner Profile"}
      </h2>
      {suggestions.map((s, i) => (
        <SuggestionItem
          key={i}
          summoner={s}
          onSelect={handleSelectSuggestion}
        />
      ))}
    </ul>
  );
}
