export default function SuggestionsLoadingIndicator({
  isNavbar,
}: {
  isNavbar?: boolean;
}) {
  return (
    <div
      className={`absolute mt-2 w-full ${
        isNavbar ? "bg-secondary" : "bg-white"
      }  flex gap-2 items-end p-3  rounded-md`}
    >
      <p
        className={`font-semibold ${
          isNavbar ? "text-subtle/50" : "text-secondary/75"
        }  text-sm lg:text-base`}
      >
        Loading
      </p>
      <div className="flex gap-2 mb-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className={`animate-bounce size-1 rounded-full ${
              isNavbar ? " bg-subtle/50" : "bg-secondary/75"
            } `}
            style={{ animationDelay: `${i * 0.2}s` }}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
