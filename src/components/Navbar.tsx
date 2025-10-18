"use client";
import Image from "next/image";
import Link from "next/link";
import SummonerSearch from "./searchbar/components/SummonerSearch";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  return (
    <div className="w-full fixed z-10 h-16 bg-accent flex items-center justify-between p-4 text-white">
      <Link href={"/"}>
        <Image src={"/FF15Logo.png"} alt="FF15 Logo" height={70} width={70} />
      </Link>

      {pathName !== "/" && <SummonerSearch variant="navbar" />}

      <div></div>
    </div>
  );
}
