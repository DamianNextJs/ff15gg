"use client";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-2 bg-bg border border-subtle/50 text-xs rounded shadow-lg opacity-0 scale-95 transform transition-all group-hover:opacity-100 group-hover:scale-100 duration-150 ease-out z-50 pointer-events-none  max-w-[25rem] w-max hidden lg:block">
        {content}
        {/* Arrow */}
        <div className="absolute bottom-[-0.4rem] left-1/2 -translate-x-1/2 w-3 h-3 bg-bg border-b border-r border-subtle/50 rotate-45"></div>
      </div>
    </div>
  );
}
