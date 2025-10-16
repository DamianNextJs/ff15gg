export default function ProfileSkeleton() {
  return (
    <main className="lg:w-250 mx-auto animate-pulse h-50 lg:h-65 flex flex-col justify-center gap-6 ">
      {/* Profile Skeleton */}
      <div className="flex items-center gap-4 mb-14 lg:mb-0 ">
        <div className="bg-secondary rounded-md w-20 h-20 lg:w-24 lg:h-24" />
        <div className="bg-secondary rounded-md h-8 w-50" />
      </div>
    </main>
  );
}
