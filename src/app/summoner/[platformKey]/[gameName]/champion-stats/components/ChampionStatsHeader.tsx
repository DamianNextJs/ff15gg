import Tooltip from "@/components/Tooltip";

export default function ChmapionStatsHeader() {
  return (
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
      <div className="hidden lg:block">
        <Tooltip content={<p>Double Kills</p>}>Double</Tooltip>
      </div>
      {/* Tripple Kills */}
      <div className="hidden lg:block">
        <Tooltip content={<p>Tripple Kills</p>}>Tripple</Tooltip>
      </div>
      {/* Quadra Kills */}
      <div className="hidden lg:block">
        <Tooltip content={<p>Quadra Kills</p>}>Quadra</Tooltip>
      </div>
      {/* Penta Kills */}
      <div className="hidden lg:block">
        <Tooltip content={<p>Penta Kills</p>}>Penta</Tooltip>
      </div>
    </div>
  );
}
