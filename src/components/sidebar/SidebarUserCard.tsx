import { useUser } from "@/features/auth/context/UserContext";
import Image from "next/image";
import UserCardMenu from "./UserCardMenu";

export default function SidebarUserCard() {
  const { user } = useUser();
  return (
    <div className="bg-secondary w-full absolute bottom-16 left-0 p-4 z-15">
      {user ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={user.image ?? "/no-icon.jpg"}
              width={40}
              height={40}
              alt="user icon"
            />
            <div className="flex flex-col">
              <p className="truncate max-w-35">{user.name}</p>
              <p className="text-green-500 text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!user.boundRiotAccount && (
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
            )}
            <UserCardMenu />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={"/no-icon.jpg"} width={40} height={40} alt="no icon" />
            <div className="flex flex-col">
              <p>Guest</p>
              <p className="text-subtle/75 text-sm">Logged Out</p>
            </div>
          </div>
          <UserCardMenu />
        </div>
      )}
    </div>
  );
}
