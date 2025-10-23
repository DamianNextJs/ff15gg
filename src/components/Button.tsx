interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  color?: "bg-primary" | "bg-red-500";
}

export default function Button({
  children,
  disabled,
  onClick,
  color = "bg-primary",
}: ButtonProps) {
  const hoverMap = {
    "bg-primary": "hover:bg-primary/80",
    "bg-red-500": "hover:bg-red-500/80",
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={`text-sm lg:text-base ${color} text-white font-medium rounded-md px-4 py-2 cursor-pointer ${
        !disabled && hoverMap[color]
      } disabled:opacity-50 disabled:cursor-default`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
