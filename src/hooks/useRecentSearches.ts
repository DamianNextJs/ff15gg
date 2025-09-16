import { useState, useEffect } from "react";
import { SummonerData } from "@/types/riot";

const STORAGE_KEY = "recentSummoners";
const MAX_RECENT = 5;

export function useRecentSearches() {
  const [recent, setRecent] = useState<SummonerData[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  const addRecent = (summoner: SummonerData) => {
    const filtered = recent.filter(
      (s) => s.riotAccount.puuid !== summoner.riotAccount.puuid
    );
    const updated = [summoner, ...filtered].slice(0, MAX_RECENT);
    setRecent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { recent, addRecent };
}
