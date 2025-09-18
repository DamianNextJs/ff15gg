import { useState, useEffect } from "react";
import { SummonerData } from "@/types/riot";

const STORAGE_KEY = "recentSummoners";
const MAX_RECENT = 5;
const STORAGE_VERSION_KEY = "recentSummonersVersion";
const CURRENT_VERSION = 1;

export function useRecentSearches() {
  const [recent, setRecent] = useState<SummonerData[]>([]);

  useEffect(() => {
    const version = localStorage.getItem(STORAGE_VERSION_KEY);
    if (version !== CURRENT_VERSION.toString()) {
      // versoin mismsatch -> clear localstorage
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION.toString());
      setRecent([]);
      return;
    }
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
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION.toString());
  };

  return { recent, addRecent };
}
