import { useUser } from "@/features/auth/context/UserContext";
import { useDropDown } from "@/features/shared/dropdowns/hooks/useDropdown";
import Link from "next/link";
import { useSidebarDrawer } from "./context/SidebarDrawerContext";

export default function UserCardMenu() {
  const { user } = useUser();
  const { open, setOpen, ref } = useDropDown();
  const { setIsOpen: setDrawerOpen } = useSidebarDrawer();

  const linkClass = "hover:bg-subtle/10 p-2";

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setDrawerOpen(false);
    }
  };
  return (
    <div
      ref={ref}
      className="cursor-pointer relative"
      onClick={() => setOpen(!open)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>

      {/* Dropdown */}

      {open && (
        <div
          className="bg-secondary text-sm text-subtle absolute w-40 bottom-15 -right-2 lg:left-1/2 lg:-translate-x-1/2 shadow shadow-black rounded-md flex
         flex-col overflow-hidden"
        >
          {user && !user.boundRiotAccount && (
            <Link
              className={`${linkClass} flex items-center gap-2`}
              href={"/"}
              onClick={handleLinkClick}
            >
              Bind Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </Link>
          )}
          {user && (
            <Link className={linkClass} href={"/"} onClick={handleLinkClick}>
              Profile Settings
            </Link>
          )}
          <Link className={linkClass} href={"/"} onClick={handleLinkClick}>
            FAQ
          </Link>

          <Link className={linkClass} href={"/"} onClick={handleLinkClick}>
            Privacy Policy
          </Link>
        </div>
      )}
    </div>
  );
}
