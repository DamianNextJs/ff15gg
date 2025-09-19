import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import ProfileCard from "./components/ProfileCard";
import ProfileLinks from "./components/ProfileLinks";
import ProfileSkeleton from "./components/ProfileSkeleton";

export const metadata: Metadata = {
  title: "Summoner page",
  description: "Summoner page of asf",
};

interface SummonerLayoutProps {
  children: ReactNode;
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function SummonerPageLayout({
  children,
  params,
}: SummonerLayoutProps) {
  return (
    <main className="min-h-screen lg:w-250 mx-auto">
      <div className="p-4 lg:p-0">
        <div className="relative">
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfileCard params={await params} />
            <ProfileLinks />
          </Suspense>
        </div>
        {children}
      </div>
    </main>
  );
}
