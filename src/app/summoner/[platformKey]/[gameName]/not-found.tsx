"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SummonerNotFound({}) {
  const { platformKey, gameName } = useParams();
  const [name, tag = ""] = decodeURIComponent(gameName as string).split("-");

  return (
    <div className="min-h-screen flex flex-col items-center text-center gap-4">
      <div className="text-7xl">404</div>
      <div className="text-3xl font-semibold">
        Couldn&apos;t find Summoner &quot;{name} #{tag}&quot; in{" "}
        {(platformKey as string).toUpperCase()}
      </div>
      <div className="text-xl text-subtle">
        Double check your region, game name and tag.
      </div>

      <Link
        href="/"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
      >
        Back to Search
      </Link>
    </div>
  );
}
