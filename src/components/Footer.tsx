import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const linkClass = "text-subtle hover:underline font-medium";
  return (
    <footer className="flex flex-col lg:flex-row justify-center px-4 py-20 text-center text-xs text-subtle/50 gap-10 lg:gap-30 border-t border-subtle/10">
      <div className="flex flex-col items-start gap-3">
        <Link href={"/"}>
          <Image src={"/FF15Logo.png"} alt="ff15 logo" width={60} height={60} />
        </Link>
        <p className="text-subtle">© 2025-{new Date().getFullYear()} FF15.GG</p>
        <p className="lg:w-sm text-left">
          FF15.GG isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the
          views or opinions of Riot Games or anyone officially involved in
          producing or managing Riot Games properties. Riot Games, and all
          associated properties are trademarks or registered trademarks of Riot
          Games, Inc.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p>Links:</p>

        <Link href={"/privacy-policy"} className={linkClass}>
          Privacy Policy
        </Link>
        <Link href={"/terms-of-service"} className={linkClass}>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
