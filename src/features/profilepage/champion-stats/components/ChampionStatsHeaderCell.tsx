import Tooltip from "@/components/Tooltip";

export default function ChampionStatsHeaderCell({
  label,
  subLabel,
  tooltip,
  showOnLgOnly,
  className = "",
  isSortedBy = false,
  sortDirection,
  onClick,
}: {
  label: string;
  subLabel?: string;
  tooltip?: string;
  showOnLgOnly?: boolean;
  className?: string;
  isSortedBy: boolean;
  sortDirection: "asc" | "desc";
  onClick: () => void;
}) {
  const base = `cursor-pointer justify-center items-center border-y-2 border-transparent
   ${showOnLgOnly ? "hidden lg:flex" : "flex"} 
   ${className}  
   ${
     isSortedBy
       ? sortDirection === "asc"
         ? "border-t-primary"
         : "border-b-primary"
       : ""
   }`;

  const content = subLabel ? (
    <>
      <p>{label}</p>
      <p>{subLabel}</p>
    </>
  ) : (
    label
  );

  return (
    <div className={base} onClick={onClick}>
      {tooltip ? (
        <Tooltip content={<p className="text-white font-normal">{tooltip}</p>}>
          {content}
        </Tooltip>
      ) : (
        content
      )}
    </div>
  );
}
