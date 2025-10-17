"use client";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full fixed z-10 h-16 bg-accent flex items-center p-4 text-white">
      <Link href={"/"}>
        <Image src={"/FF15Logo.png"} alt="FF15 Logo" height={70} width={70} />
      </Link>
    </div>
  );
}
