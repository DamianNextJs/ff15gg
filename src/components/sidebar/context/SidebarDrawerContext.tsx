"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type SidebarDrawerContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SidebarDrawerContext = createContext<
  SidebarDrawerContextType | undefined
>(undefined);

export function SidebarDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setIsOpen(true);
    }
  }, []);

  return (
    <SidebarDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export function useSidebarDrawer() {
  const context = useContext(SidebarDrawerContext);
  if (!context) {
    throw new Error(
      "useSidebarDrawer must be used within a SidebarDrawerProvider"
    );
  }

  return context;
}
