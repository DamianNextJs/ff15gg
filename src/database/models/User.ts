import { User } from "@/types/user";
import mongoose, { Schema, Document } from "mongoose";

const UserSchema = new Schema<User & Document>({
  email: { type: String, required: true, unique: true },
  image: { type: String },
  name: { type: String, required: true },
  boundRiotAccount: {
    puuid: String,
    gameName: String,
    tagLine: String,
    profileIconId: Number,
    summonerLevel: Number,
    platform: String,
    rank: String,
    tier: String,
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
