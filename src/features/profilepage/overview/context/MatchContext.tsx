import { createContext, ReactNode, useContext } from "react";
import { MatchData, ParticipantData } from "@/types/match";

type MatchContextType = {
  match: MatchData;
  myParticipant: ParticipantData;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({
  match,
  myParticipant,
  children,
}: {
  match: MatchData;
  myParticipant: ParticipantData;
  children: ReactNode;
}) {
  return (
    <MatchContext.Provider value={{ match, myParticipant }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatchContext() {
  const ctx = useContext(MatchContext);
  if (!ctx)
    throw new Error("useMatchContext must be used within MatchProvider");
  return ctx;
}
