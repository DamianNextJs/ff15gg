"use client";

import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import { useUser } from "@/features/auth/context/UserContext";
import { DDragon } from "@/utils/ddragon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UpdateAppearance } from "../lib/actions";

export default function ProfilePreferences() {
  const { user, setUser } = useUser();
  const [appearance, setAppearance] = useState<"Google" | "Summoner">();

  useEffect(() => {
    if (user?.preferences.appearance) {
      setAppearance(user.preferences.appearance);
    }
  }, [user]);

  const summonerProfileIcon = DDragon.profileIcon(
    user?.boundRiotAccount?.profileIconId ?? 0
  );
  const summonerName = `${user?.boundRiotAccount?.gameName} #${user?.boundRiotAccount?.tagLine}`;

  const displayIcon =
    appearance === "Google" ? user?.image : summonerProfileIcon;
  const displayName = appearance === "Google" ? user?.name : summonerName;

  const handleClick = async () => {
    if (!user?._id || !appearance) return;
    const updatedUser = await UpdateAppearance(user?._id, appearance);
    setUser(updatedUser);
  };

  return (
    <div>
      {!user?.boundRiotAccount ? (
        <p className="text-sm text-subtle">
          In Order to change your profile Preferences, please{" "}
          <Link href={"bind-summoner"} className="underline">
            {" "}
            bind a Summoner Account first
          </Link>{" "}
        </p>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <h3 className="underline text-lg">Change Appearance:</h3>

          <div>
            <div className="flex items-center gap-1">
              <p>Show Summoner (Recommended): </p>
              <CheckBox
                isChecked={appearance === "Summoner"}
                onClick={() => setAppearance("Summoner")}
              />
            </div>
            <div className="flex items-center gap-1">
              <p>Show Google User:</p>
              <CheckBox
                isChecked={appearance === "Google"}
                onClick={() => setAppearance("Google")}
              />
            </div>
          </div>

          <div className="flex gap-2 bg-secondary p-2 rounded-md w-full lg:w-2/3">
            <Image
              src={displayIcon ?? "/no-icon.jpg"}
              alt="profile Icon"
              height={40}
              width={40}
            />
            <p className="truncate max-w-full">{displayName}</p>
          </div>
          {user.preferences.appearance !== appearance && (
            <Button onClick={handleClick}>Save</Button>
          )}
        </div>
      )}
    </div>
  );
}
