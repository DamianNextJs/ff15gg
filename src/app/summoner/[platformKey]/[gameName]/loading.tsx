export default function Loading() {
  return (
    <main className="min-h-screen lg:w-250 mx-auto animate-pulse pt-8 lg:pt-16 px-4 lg:px-0 flex flex-col gap-6">
      {/* Profile Skeleton */}
      <div className="flex items-center gap-4">
        <div className="bg-secondary rounded-md w-20 h-20 lg:w-24 lg:h-24" />
        <div className="bg-secondary rounded-md h-8 w-50" />
      </div>

      <div className="lg:flex gap-3 mt-5 lg:mt-16">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Rank Skeleton */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-secondary rounded-md p-4">
              <div className="bg-accent rounded-md p-4 w-30" />
              <div className="bg-accent rounded-md p-6 mt-3" />
            </div>
          ))}

          {/* Champ Stats Skeleton */}
          <div className="bg-secondary rounded-md p-4 flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md w-full p-5 lg:p-6" />
            ))}
          </div>

          {/* Recently Played With Skeleton */}
          <div className="bg-secondary rounded-md p-4 flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md w-full p-5 lg:p-6" />
            ))}
          </div>
        </div>

        {/* Right Column (Match History) */}
        <div className="flex-2 mt-3 lg:mt-0 flex flex-col gap-4">
          <div className="bg-secondary rounded-md p-4 flex flex-col gap-3">
            {/* Container Title */}
            <div className="bg-accent rounded-md h-6 w-40 lg:w-48" />

            {/* Header Skeleton (like MatchHistoryHeader) */}
            <div className="bg-accent rounded-md h-16 w-full" />

            {/* Match Cards Skeleton */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-accent rounded-md h-24 lg:h-28 w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
