"use client";
import SummonerSearch from "@/components/searchbar/components/SummonerSearch";
import { SummonerData } from "@/types/summoner";
import { useEffect, useState } from "react";
import SummonerCard from "./SummonerCard";
import { useUser } from "@/features/auth/context/UserContext";
import { BindAccount, RemoveBoundSummoner } from "../lib/actions";
import Link from "next/link";

export default function BindSummoner() {
  const { user, setUser } = useUser();
  const [summonerToBind, setSummonerToBind] = useState<SummonerData | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerToBind]);

  const handleBindClick = async () => {
    if (!user || !summonerToBind) return;
    const updatedUser = await BindAccount(user, summonerToBind);

    if (updatedUser) {
      setUser(updatedUser);
      setError("");
      setSummonerToBind(null);
    } else {
      setError("Summoner is already bound to another account");
    }
  };

  const handleRemoveClick = async () => {
    if (!user?._id || !user.boundRiotAccount) return;
    const updatedUser = await RemoveBoundSummoner(
      user._id,
      user.boundRiotAccount?.puuid
    );
    setUser(updatedUser);
    setSummonerToBind(null);
  };

  return (
    <div>
      {user?.boundRiotAccount ? (
        <SummonerCard
          boundSummoner={user.boundRiotAccount}
          handleRemoveClick={handleRemoveClick}
        />
      ) : (
        <div>
          <p className="text-subtle text-sm mb-3">
            If you can&apos;t see your Summoner Account here, try searching for
            it first on the{" "}
            <Link href={"/"} className="underline">
              HomePage
            </Link>
            . Once it&apos;s saved in our database, you&apos;ll be able to find
            it here.
          </p>
          <SummonerSearch
            variant={"profile-settings"}
            setSummonerToBind={setSummonerToBind}
          />
          {summonerToBind && (
            <SummonerCard
              summonerToBind={summonerToBind}
              handleBindClick={handleBindClick}
              error={error !== ""}
            />
          )}
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </div>
      )}
    </div>
  );
}
