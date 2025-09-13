import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-8 pt-50 text-center">
      <div className="flex flex-col gap-3 text-5xl lg:text-7xl">
        <span>404</span>
        <span>This Page doesn&apos;t exist</span>
      </div>
      <Link
        href="/"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
