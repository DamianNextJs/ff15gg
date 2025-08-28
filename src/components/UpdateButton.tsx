"use client";

import { formatTimeAgo } from "@/helper";

interface UpdateButtonProps {
  loading: boolean;
  flash: boolean;
  handleClick: () => void;
  lastUpdated: number;
}

export default function UpdateButton({
  loading,
  flash,
  handleClick,
  lastUpdated,
}: UpdateButtonProps) {
  return (
    <button
      className={`relative w-30 text-xs px-2 py-2 rounded-sm font-bold transition-all duration-300 cursor-pointer flex justify-center items-center group ${
        flash ? "bg-yellow-400 scale-105" : "bg-primary"
      }`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-[var(--color-subtle)] border-t-transparent rounded-full animate-spin"></span>
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

      <div className="absolute bg-bg -top-13 p-2.5 w-60 border border-secondary rounded-sm shadow-lg shadow-black opacity-0  group-hover:opacity-100 transition duration-200 ease-in-out font-semibold">
        Last Updated: {formatTimeAgo(lastUpdated)}
        <div className="bg-bg w-4 h-4 border border-secondary absolute left-1/2 -translate-x-1/2 rotate-45 border-t-0 border-s-0 -bottom-2"></div>
      </div>
    </button>
  );
}
