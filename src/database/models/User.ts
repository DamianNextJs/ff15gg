import { User } from "@/types/user";
import mongoose, { Schema, Document } from "mongoose";

const BoundRiotAccountSchema = new Schema(
  {
    puuid: { type: String, unique: true, sparse: true },
    gameName: String,
    tagLine: String,
    profileIconId: Number,
    summonerLevel: Number,
    platform: String,
  },
  { _id: false }
);

const UserSchema = new Schema<User & Document>({
  email: { type: String, required: true, unique: true },
  image: { type: String },
  name: { type: String, required: true },
  preferences: {
    type: new Schema(
      {
        appearance: {
          type: String,
          enum: ["Google", "Summoner"],
          default: "Google",
        },
      },
      { _id: false }
    ),
    default: {},
  },
  boundRiotAccount: BoundRiotAccountSchema,
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
