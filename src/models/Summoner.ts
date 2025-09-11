import mongoose, { Schema, Document } from "mongoose";
import { SummonerData } from "@/types/riot";

export interface ISummoner extends Document {
  puuid: string;
  gameName: string;
  normalizedName: string;
  tagLine: string;
  platform: string;
  data: SummonerData;
  lastUpdated: Date;
}

const SummonerSchema = new Schema<ISummoner>({
  puuid: { type: String, required: true, unique: true },
  gameName: { type: String, required: true },
  normalizedName: { type: String, required: true },
  tagLine: { type: String, required: true },
  platform: {
    type: String,
    enum: ["NA1", "EUW1", "EUN1", "KR"], // adjust to your supported platforms
    required: true,
  },
  data: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

// Compound index for faster cache lookup
SummonerSchema.index({ normalizedName: 1, tagLine: 1, platform: 1 });

export default mongoose.models.Summoner ||
  mongoose.model<ISummoner>("Summoner", SummonerSchema);
