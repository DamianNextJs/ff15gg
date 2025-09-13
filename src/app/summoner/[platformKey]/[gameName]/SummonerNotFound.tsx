import Link from "next/link";

interface SummonerNotFoundProps {
  platformKey?: string;
  gameName?: string;
}

export default function SummonerNotFound({
  platformKey,
  gameName,
}: SummonerNotFoundProps) {
  return (
    <div className="h-screen flex flex-col items-center pt-30 text-center gap-4">
      <div className="text-7xl">404</div>
      <div className="text-3xl font-semibold">
        Couldn&apos;t find Summoner &quot;{gameName}&quot; in{" "}
        {platformKey?.toUpperCase()}
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
