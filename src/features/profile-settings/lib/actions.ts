"use server";

import User from "@/database/models/User";
import { connectToDB } from "@/database/mongodb";

export async function DeleteUser(user_id: string) {
  await connectToDB();

  const result = await User.deleteOne({ _id: user_id });
  return result.deletedCount === 1;
}
