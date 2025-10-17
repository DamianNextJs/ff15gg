interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="text-sm lg:text-base bg-primary text-white font-medium rounded-md px-4 py-2 cursor-pointer transition-opacity hover:bg-primary/80 disabled:opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
