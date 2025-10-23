"use client";

import { User } from "@/types/user";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { saveSessionUser } from "../lib/actions";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isPending: boolean;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();

  const refreshUser = useCallback(async () => {
    if (status === "authenticated") {
      startTransition(async () => {
        const savedUser = await saveSessionUser();
        setUser(savedUser);
      });
    } else {
      setUser(null);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "loading") {
      refreshUser();
    }
  }, [status, refreshUser]);

  return (
    <UserContext.Provider value={{ user, setUser, isPending, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
