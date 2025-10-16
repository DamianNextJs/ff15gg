"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "./overview" },
  { label: "Champion Stats", href: "./champion-stats" },
  { label: "Live Game", href: "./live-game" },
];

export default function ProfileLinks() {
  const pathName = usePathname() || "";

  return (
    <nav className="absolute bottom-10  left-0 space-x-7 font-semibold text-sm lg:text-base">
      {links.map((link) => {
        const isActive = pathName.includes(link.href.replace("./", "/"));

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`pb-2 border-b-2 ${
              isActive
                ? "border-blue-500 text-blue-500"
                : "border-transparent hover:border-blue-500"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
