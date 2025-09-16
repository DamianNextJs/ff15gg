import { RuneInfo } from "@/types/rune";

interface RuneTooltipProps {
  rune: RuneInfo;
}

export const RuneTooltip = ({ rune }: RuneTooltipProps) => (
  <div className="text-xs">
    <strong className="text-blue-500 text-sm">{rune.name}</strong>
    {rune.longDesc || rune.shortDesc ? (
      <div
        className="mt-1"
        dangerouslySetInnerHTML={{
          __html: rune.longDesc ?? rune.shortDesc ?? "",
        }}
      />
    ) : null}
  </div>
);
