"use client";
import Image from "next/image";
import Link from "next/link";
import SummonerSearch from "./searchbar/components/SummonerSearch";
import { usePathname } from "next/navigation";
import SidebarDrawer from "./sidebar/SidebarDrawer";
import { useEffect, useState, useTransition } from "react";
import Button from "./Button";
import { signIn, signOut, useSession } from "next-auth/react";
import { saveSessionUser } from "@/features/auth/lib/actions";
import { User } from "@/types/user";

export default function NavBar() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      startTransition(async () => {
        const savedUser = await saveSessionUser();
        setUser(savedUser);
      });
    }
  }, [status]);

  return (
    <div className="w-full fixed z-10 h-16 bg-accent flex items-center justify-between p-4 text-white">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <Link href={"/"}>
          <Image src={"/FF15Logo.png"} alt="FF15 Logo" height={70} width={70} />
        </Link>
      </div>

      {/* Search bar - shown on desktop */}
      {pathName !== "/" && <SummonerSearch variant="navbar" />}

      {/* login / logout button */}
      {!session ? (
        <Button onClick={() => signIn("google")} disabled={isPending}>
          Log In
        </Button>
      ) : (
        <Button onClick={() => signOut()}>Log Out</Button>
      )}

      <SidebarDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
