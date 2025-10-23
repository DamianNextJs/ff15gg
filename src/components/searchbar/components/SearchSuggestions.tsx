"use client";

import { SummonerData } from "@/types/summoner";
import { useEffect, useState, useMemo, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { RegionKey } from "@/lib/maps/regionMap";
import SuggestionsLoadingIndicator from "./SuggestionsLoadingIndicator";
import SuggestionItem from "./SuggestionItem";
import { useCachedSummoners } from "../hooks/useCachedSummoners";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { createSummonerUrl } from "@/utils/summoner";
import { useSidebarDrawer } from "@/components/sidebar/context/SidebarDrawerContext";

interface SearchSuggestionsProps {
  summonerName: string;
  region: RegionKey;
  focused: boolean;
  isNavbar?: boolean;
  isDrawer?: boolean;
  isProfileSettings?: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setSummonerToBind?: Dispatch<SetStateAction<SummonerData | null>>;
}

export default function SearchSuggestions({
  summonerName,
  region,
  focused,
  setFocused,
  isNavbar = false,
  isDrawer,
  isProfileSettings,
  setSummonerToBind,
}: SearchSuggestionsProps) {
  const { results, loading } = useCachedSummoners(summonerName, region);
  const { recent, addRecent } = useRecentSearches();
  const { setIsOpen } = useSidebarDrawer();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  // Delay showing loader to avoid flicker on short requests
  useEffect(() => {
    if (!loading) {
      setShowLoader(false);
      return;
    }
    const timeout = setTimeout(() => setShowLoader(true), 200);
    return () => clearTimeout(timeout);
  }, [loading]);

  // ─── Handle selecting a suggestion ───────────────────
  // Behavior differs by variant: profile-settings vs others
  const handleSelectSuggestion = (summoner: SummonerData) => {
    // inside profile settings return the summoner up to summonersearch instead of navigation
    if (isProfileSettings && setSummonerToBind) {
      setSummonerToBind(summoner);
      setFocused(false);
      return;
    }

    // Default navigation behavior
    addRecent(summoner);
    setFocused(false);
    const summonerUrl = createSummonerUrl(
      summoner.riotAccount.gameName,
      summoner.riotAccount.tagLine
    );
    if (isDrawer) setIsOpen(false);

    router.push(
      `/summoner/${summoner.platform}/${encodeURIComponent(
        summonerUrl
      )}/overview`
    );
  };

  const trimmedInput = summonerName.trim();
  // Compute which list to show (recent searches vs API results)
  const suggestions: SummonerData[] = useMemo(() => {
    if (!focused) return [];
    if (!trimmedInput && !isProfileSettings) return recent; // show all recent searches
    return results; // show cached search results
  }, [focused, trimmedInput, recent, results]);

  if (showLoader) return <SuggestionsLoadingIndicator isNavbar={isNavbar} />;
  if (!suggestions.length) return null;

  return (
    <ul
      className={`absolute mt-2 w-full ${
        isNavbar ? "bg-secondary" : "bg-white"
      }  z-10 rounded-md overflow-hidden`}
    >
      <h2
        className={`${
          isNavbar ? "bg-primary/50" : "bg-subtle"
        }  text-xs lg:text-sm p-2`}
      >
        {!trimmedInput && !isProfileSettings
          ? "Recent Searches"
          : "Summoner Profile"}
      </h2>
      {suggestions.map((s, i) => (
        <SuggestionItem
          key={i}
          summoner={s}
          onSelect={handleSelectSuggestion}
          isNavbar={isNavbar}
        />
      ))}
    </ul>
  );
}
