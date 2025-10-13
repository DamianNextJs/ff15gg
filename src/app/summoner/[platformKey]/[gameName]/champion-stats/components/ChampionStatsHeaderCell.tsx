import Tooltip from "@/components/Tooltip";

export default function HeaderCell({
  label,
  subLabel,
  tooltip,
  showOnLgOnly,
  className = "",
}: {
  label: string;
  subLabel?: string;
  tooltip?: string;
  showOnLgOnly?: boolean;
  className?: string;
}) {
  const base = `${
    showOnLgOnly ? "hidden lg:block" : ""
  } ${className} cursor-pointer`;

  const content = subLabel ? (
    <>
      <p>{label}</p>
      <p>{subLabel}</p>
    </>
  ) : (
    label
  );

  return tooltip ? (
    <div className={base}>
      <Tooltip content={<p className="text-white">{tooltip}</p>}>
        {content}
      </Tooltip>
    </div>
  ) : (
    <div className={base}>{content}</div>
  );
}
