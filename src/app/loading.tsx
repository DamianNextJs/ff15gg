export default function Loading() {
  return (
    <div className="absolute mt-1 w-full bg-white flex gap-2 items-end p-3  rounded-md">
      <p className="font-semibold text-secondary text-sm lg:text-base">
        Loading
      </p>
      <div className="flex gap-2 mb-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className="animate-bounce size-1 rounded-full bg-secondary"
            style={{ animationDelay: `${i * 0.2}s` }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
