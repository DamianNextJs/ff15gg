"use server";

import User from "@/database/models/User";
import { connectToDB } from "@/database/mongodb";
import { findRankData } from "@/features/profilepage/utils/findRankData";
import { SummonerData } from "@/types/summoner";
import { User as UserType } from "@/types/user";

export async function DeleteUser(user_id: string) {
  await connectToDB();

  const result = await User.deleteOne({ _id: user_id });
  return result.deletedCount === 1;
}

export async function BindAccount(
  user: UserType,
  summonerToBind: SummonerData
) {
  await connectToDB();

  const foundSoloRank = findRankData(
    summonerToBind.ranked ?? [],
    "Ranked Solo"
  );
  const soloRank = foundSoloRank
    ? { tier: foundSoloRank.tier, rank: foundSoloRank.rank }
    : "Unranked";

  const boundRiotAccount: UserType["boundRiotAccount"] = {
    puuid: summonerToBind.riotAccount.puuid,
    gameName: summonerToBind.riotAccount.gameName,
    tagLine: summonerToBind.riotAccount.tagLine,
    profileIconId: summonerToBind.summoner.profileIconId,
    summonerLevel: summonerToBind.summoner.summonerLevel,
    platform: summonerToBind.platform ?? "",
    soloRank,
  };

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        boundRiotAccount,
      },
    },
    { new: true }
  ).lean<UserType>();

  return { ...updatedUser, _id: updatedUser?._id?.toString() } as UserType;
}

export async function RemoveBoundSummoner(user_id: string, puuid: string) {
  await connectToDB();

  const updatedUser = await User.findOneAndUpdate(
    { _id: user_id, "boundRiotAccount.puuid": puuid },
    { $unset: { boundRiotAccount: 1 } },
    { new: true }
  ).lean<UserType>();

  return { ...updatedUser, _id: updatedUser?._id?.toString() } as UserType;
}
