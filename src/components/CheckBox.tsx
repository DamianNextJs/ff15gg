interface CheckBoxProps {
  isChecked: boolean;
  onClick?: () => void;
}

export default function CheckBox({ isChecked, onClick }: CheckBoxProps) {
  return (
    <div
      className={`size-4.5 flex items-center justify-center rounded-md cursor-pointer ${
        isChecked ? "bg-primary" : "bg-subtle"
      }`}
      onClick={onClick}
    >
      {isChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-3.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      )}
    </div>
  );
}
