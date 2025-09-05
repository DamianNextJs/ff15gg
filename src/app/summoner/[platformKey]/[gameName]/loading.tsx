export default function Loading() {
  return (
    <main className="w-full lg:w-250 lg:mt-14 min-h-screen pt-8 px-4 lg:px-0 mx-auto animate-pulse flex flex-col">
      {/* Profile skeleton */}
      <div className="flex items-center gap-4">
        {/* Profile Icon */}
        <div className="bg-secondary rounded-md size-20 lg:size-24" />
        {/* Profile Name */}
        <div className="bg-secondary rounded-md h-8 w-50" />
      </div>

      {/* Rank Skeleton */}
      <div className="flex flex-col gap-4 w-full mt-10 lg:mt-20">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-secondary rounded-md p-4">
            <div className="bg-accent rounded-md p-4 w-30" />
            <div className="bg-accent rounded-md p-6 mt-3" />
          </div>
        ))}
      </div>

      {/* Champ stats skeleton */}
      <div className="flex flex-col gap-4 w-full mt-3 p-4 rounded-md bg-secondary">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-accent rounded-md w-full p-5 lg:p-6" />
        ))}
      </div>

      {/* Recently played with  skeleton */}
      <div className="flex flex-col gap-4 w-full mt-3 p-4 rounded-md bg-secondary">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-accent rounded-md w-full p-5 lg:p-6" />
        ))}
      </div>
    </main>
  );
}
