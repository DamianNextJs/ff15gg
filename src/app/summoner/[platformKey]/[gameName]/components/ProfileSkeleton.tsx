export default function ProfileSkeleton() {
  return (
    <main className=" lg:w-250 mx-auto animate-pulse pt-8 lg:pt-16  lg:px-0 flex flex-col gap-6">
      {/* Profile Skeleton */}
      <div className="flex items-center gap-4">
        <div className="bg-secondary rounded-md w-20 h-20 lg:w-24 lg:h-24" />
        <div className="bg-secondary rounded-md h-8 w-50" />
      </div>
    </main>
  );
}
