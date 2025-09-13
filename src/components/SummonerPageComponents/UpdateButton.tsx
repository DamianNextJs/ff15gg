"use client";

import { formatTimeAgo } from "@/helper/utils/utils";

interface UpdateButtonProps {
  loading: boolean;
  flash: boolean;
  handleClick: () => void;
  lastUpdated: number;
  disabled?: boolean;
}

export default function UpdateButton({
  loading,
  flash,
  handleClick,
  lastUpdated,
  disabled = false,
}: UpdateButtonProps) {
  return (
    <button
      className={`relative w-30 text-xs lg:text-sm px-2 py-2 rounded-sm font-semibold transition-all duration-300 flex justify-center items-center group ${
        flash ? "bg-yellow-400 scale-105" : "bg-primary"
      } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleClick}
      disabled={loading || disabled}
    >
      {loading ? (
        <span className="size-4 lg:size-5 border-2 border-subtle border-t-transparent rounded-full animate-spin"></span>
      ) : flash ? (
        <span className="relative  flex items-center gap-1">
          Updated
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </span>
      ) : (
        <span className="relative">Update</span>
      )}

      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-4 bg-bg border border-subtle/50 text-xs rounded shadow-lg opacity-0 scale-95 transform transition-all group-hover:opacity-100 group-hover:scale-100 duration-150 ease-out z-50 pointer-events-none min-w-[8rem]  w-max hidden lg:block">
        Last Updated: {formatTimeAgo(lastUpdated)}
        {/* Arrow */}
        <div className="absolute bottom-[-0.4rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-bg border-b border-r border-subtle/50 rotate-45"></div>
      </div>
    </button>
  );
}
