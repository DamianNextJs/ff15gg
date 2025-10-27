import { useUser } from "@/features/auth/context/UserContext";
import Image from "next/image";
import UserCardMenu from "./UserCardMenu";
import { DDragon } from "@/utils/ddragon";

export default function SidebarUserCard() {
  const { user } = useUser();

  const summonerProfileIcon = DDragon.profileIcon(
    user?.boundRiotAccount?.profileIconId ?? 0
  );
  const summonerName = `${user?.boundRiotAccount?.gameName} #${user?.boundRiotAccount?.tagLine}`;

  const isGoogleAppearance = user?.preferences.appearance === "Google";
  const displayIcon = isGoogleAppearance ? user.image : summonerProfileIcon;
  const displayName = isGoogleAppearance ? user.name : summonerName;
  const isGuest = !user;

  return (
    <div className="bg-secondary w-full absolute bottom-16 left-0 p-4 z-15">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={isGuest ? "/no-icon.jpg" : displayIcon ?? "/no-icon.jpg"}
            width={40}
            height={40}
            alt="user icon"
          />
          <div className="flex flex-col">
            <p className="truncate max-w-50 lg:max-w-35">
              {isGuest ? "Guest" : displayName}
            </p>
            <p
              className={`text-sm ${
                isGuest ? "text-subtle/75" : "text-green-500 "
              }`}
            >
              {isGuest ? "Logged Out" : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isGuest && !user.boundRiotAccount && (
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
    </div>
  );
}
