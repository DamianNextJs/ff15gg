"use client";
import { createContext, useContext, ReactNode } from "react";

const VersionContext = createContext<string | null>(null);

export function VersionProvider({
  version,
  children,
}: {
  version: string;
  children: ReactNode;
}) {
  return <VersionContext value={version}>{children}</VersionContext>;
}

export function useVersion() {
  const version = useContext(VersionContext);
  if (!version)
    throw new Error("useVersion must be used within a VersionProvided");
  return version;
}
