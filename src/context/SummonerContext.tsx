"use client";

import { createContext, ReactNode, useContext } from "react";
import { SummonerData } from "@/types/riot";

interface SummonerContextValue {
  summonerData: SummonerData;
}

const SummonerContext = createContext<SummonerContextValue | undefined>(
  undefined
);

export function useSummonerData() {
  const context = useContext(SummonerContext);
  if (!context) {
    throw new Error("useSummonerData must be used inside SummonerProvider");
  }
  return context;
}

interface ProviderProps {
  children: ReactNode;
  summonerData: SummonerData;
}

export function SummonerProvider({ children, summonerData }: ProviderProps) {
  return (
    <SummonerContext.Provider value={{ summonerData }}>
      {children}
    </SummonerContext.Provider>
  );
}
