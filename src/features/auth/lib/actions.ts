"use server";

import User from "@/database/models/User";
import { connectToDB } from "@/database/mongodb";
import { authOptions } from "@/lib/auth";
import { User as UserType } from "@/types/user";
import { getServerSession } from "next-auth";

export async function saveSessionUser() {
  await connectToDB();

  const session = await getServerSession(authOptions);
  if (!session?.user) return null;

  const { email, name, image } = session.user;

  const savedUser = await User.findOneAndUpdate(
    { email },
    { email, name, image },
    { upsert: true, new: true }
  ).lean<UserType>();

  if (!savedUser) return null;

  return {
    ...savedUser,
    _id: savedUser._id?.toString(),
  } as UserType;
}
