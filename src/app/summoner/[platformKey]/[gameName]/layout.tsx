import ProfileCard from "@/features/profilepage/components/ProfileCard";
import ProfileSkeleton from "@/features/profilepage/components/ProfileSkeleton";
import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";

export const metadata: Metadata = {
  title: "Summoner Page | FF15",
  description:
    "View Summoner stats, match history and live game for your League of Legends Summoner",
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
          </Suspense>
        </div>
        {children}
      </div>
    </main>
  );
}
