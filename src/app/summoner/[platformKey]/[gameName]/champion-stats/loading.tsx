export default function Loading() {
  return (
    <div className="bg-secondary rounded-md -mt-1">
      <div className="bg-accent/50  lg:p-4  lg:gap-4 text-sm lg:text-base rounded-t-md h-13 lg:h-18" />
      <div className="grid grid-cols-6 lg:grid-cols-17 py-4 items-center justify-items-center lg:justify-items-normal text-center text-sm text-subtle">
        {/* Rank */}
        <p className="">#</p>

        {/* Champion */}
        <p className="lg:col-span-2">Champion</p>

        {/* Winrate */}
        <p className="col-span-2">Win Rate</p>

        {/* KDA */}
        <p className="col-span-2">KDA</p>

        {/* Max Kills */}
        <div className="hidden lg:block">
          <p>Max</p>
          <p>Kills</p>
        </div>

        {/* Max Deaths */}
        <div className="hidden lg:block">
          <p>Max</p>
          <p>Deaths</p>
        </div>

        {/* CS */}
        <p className="hidden lg:block">CS</p>

        {/* Damage */}
        <p className="hidden lg:block">Damage</p>

        {/* Gold */}
        <p className="hidden lg:block">Gold</p>

        {/* Vision */}
        <p className="hidden lg:block">Vision</p>

        {/* Double Kills */}
        <div className="hidden lg:block">Double</div>
        {/* Tripple Kills */}
        <div className="hidden lg:block">Tripple</div>
        {/* Quadra Kills */}
        <div className="hidden lg:block">Quadra</div>
        {/* Penta Kills */}
        <div className="hidden lg:block">Penta</div>
      </div>
      <div className="h-50 flex items-center justify-center">
        <div className="w-12 lg:w-14 h-12 lg:h-14 border-7 border-t-primary  border-primary/20 rounded-full animate-spin" />
      </div>
    </div>
  );
}
