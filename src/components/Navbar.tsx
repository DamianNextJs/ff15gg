"use client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="w-full fixed z-10  h-16 bg-accent flex p-4 text-white">
      <h2 className="text-2xl font-bold cursor-pointer" onClick={handleClick}>
        FF15
      </h2>
    </div>
  );
}
