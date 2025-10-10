import SectionHeading from "@/components/SectionHeading";
import MatchHistoryLoader from "./components/MatchHistoryComponents/MatchHistoryLoader";

export default function Loading() {
  return (
    <main className="min-h-screen lg:w-250 mx-auto lg:p-0 flex flex-col lg:flex-row -mt-4 gap-3">
      {/* Left column */}
      <section className="animate-pulse flex-1">
        {/* Ranked Cards */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <SectionHeading text="Ranked Solo" />
          <div className="bg-accent mt-4 h-12.5 rounded-md " />
        </div>
        <div className="mt-3 bg-secondary rounded-md p-4">
          <SectionHeading text="Ranked Flex" />
          <div className="bg-accent mt-4 h-12.5 rounded-md " />
        </div>
        {/* Champion Stats */}
        <div className="mt-3 bg-secondary rounded-md p-4 pb-3">
          <SectionHeading text="Champion Stats" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-accent rounded-md h-9 mt-4" />
          ))}
        </div>
        {/* Champion Mastery */}
        <div className="mt-3 bg-secondary rounded-md p-4">
          <SectionHeading text="Champion Mastery" />
          <div className="flex justify-around">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md w-12 h-24.5 mt-4" />
            ))}
          </div>
        </div>
        {/* Recently Played With */}
        <div className="mt-3 bg-secondary rounded-md p-4 pb-2.5">
          <SectionHeading text="Recently Played With" />
          <div className="mt-3 text-xs">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] bg-subtle/15 -mx-4 px-4 py-3 border-t border-accent">
              <p>Summoner</p>
              <p className="text-center">Played</p>
              <p className="text-center">W - L</p>
              <p className="text-center">Win Ratio</p>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-accent rounded-md h-7 mt-3" />
            ))}
          </div>
        </div>
      </section>
      {/* Right Column */}
      <section className="flex-2 hidden lg:block">
        <div className="mt-3 bg-secondary rounded-md p-4 h-190.5">
          <div className="h-10 flex items-center">
            <SectionHeading text="Match History" />
          </div>
          {/* Match History Header */}
          <div className="-mx-4 px-4 py-3 h-15 lg:h-17 bg-accent mt-4 flex justify-center gap-10 pe-10" />
          {/* Match History Loader */}
          <div className="mt-3">
            <MatchHistoryLoader />
          </div>
        </div>
      </section>
    </main>
  );
}
