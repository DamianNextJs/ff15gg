import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Guides",
  description: "Create your own League of Legends Build guides",
};

interface BuildGuidesLayoutProps {
  children: React.ReactNode;
}

export default function BuildGuidesLayout({
  children,
}: BuildGuidesLayoutProps) {
  return <div className="min-h-screen p-4">{children}</div>;
}
