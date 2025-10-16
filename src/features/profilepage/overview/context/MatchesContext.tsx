"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { MatchData } from "@/types/match";

interface MatchesContextType {
  matches: MatchData[];
  setMatches: Dispatch<SetStateAction<MatchData[]>>;
  currentQueue: number | "all";
  setCurrentQueue: Dispatch<SetStateAction<number | "all">>;
}

const MatchesContext = createContext<MatchesContextType | null>(null);

export function MatchesProvider({
  initialMatches,
  children,
}: {
  initialMatches: MatchData[] | [];
  children: ReactNode;
}) {
  const [matches, setMatches] = useState<MatchData[]>(initialMatches);
  const [currentQueue, setCurrentQueue] = useState<number | "all">("all");

  useEffect(() => {
    setMatches(initialMatches);
  }, [initialMatches]);

  return (
    <MatchesContext.Provider
      value={{ matches, setMatches, currentQueue, setCurrentQueue }}
    >
      {children}
    </MatchesContext.Provider>
  );
}

export function useMatches() {
  const context = useContext(MatchesContext);
  if (!context)
    throw new Error("useMatches must be used inside a Matches Provider");
  return context;
}
