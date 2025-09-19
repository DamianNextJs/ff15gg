import MatchHistoryLoader from "./components/MatchHistoryComponents/MatchHistoryLoader";

export default function Loading() {
  return (
    <main className="min-h-screen lg:w-250 mx-auto lg:p-0 flex flex-col lg:flex-row -mt-4 gap-3">
      {/* Left column */}
      <section className="animate-pulse flex-1">
        {/* Ranked Cards */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Ranked Solo
          </h2>
          <div className="bg-accent mt-4 h-12.5 rounded-md " />
        </div>
        <div className="mt-3 bg-secondary rounded-md p-4">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Ranked Flex
          </h2>
          <div className="bg-accent mt-4 h-12.5 rounded-md " />
        </div>
        {/* Champion Stats */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Champion Stats
          </h2>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-accent rounded-md h-10 mt-4" />
          ))}
        </div>
        {/* Champion Mastery */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Champion Mastery
          </h2>
          <div className="flex justify-around">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md w-12 h-24.5 mt-4" />
            ))}
          </div>
        </div>
        {/* Recently Played With */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Recently Played With
          </h2>
          <div className="mt-3 text-xs">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-subtle/15 -mx-4 px-4 py-4 border-t border-accent">
              <p>Summoner</p>
              <p className="text-center">Played</p>
              <p className="text-center">W - L</p>
              <p className="text-center">Win Ratio</p>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md h-8.5 mt-4" />
            ))}
          </div>
        </div>
      </section>
      {/* Right Column */}
      <section className="flex-2">
        <div className="mt-3 bg-secondary rounded-md p-4 h-200">
          <h2 className="text-sm lg:text-base font-semibold border-l-2 border-primary ps-3">
            Match History
          </h2>
          {/* Match History Header */}
          <div className="-mx-4 px-4 py-3 h-15 lg:h-17 bg-accent mt-3 flex justify-center gap-10 pe-10"></div>
          {/* Match History Loader */}
          <div className="mt-3">
            <MatchHistoryLoader />
          </div>
        </div>
      </section>
    </main>
  );
}
