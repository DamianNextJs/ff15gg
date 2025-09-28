import mongoose, { Schema, Document } from "mongoose";
import { SummonerData } from "@/types/riot";

export interface ISummoner extends Document {
  normalizedGameName: string;
  normalizedTagLine: string;
  platform: string;
  data: SummonerData;
  lastUpdated: Date;
}

const SummonerSchema = new Schema<ISummoner>({
  normalizedGameName: { type: String, required: true },
  normalizedTagLine: { type: String, required: true },
  platform: {
    type: String,
    required: true,
  },
  lastUpdated: { type: Date, default: Date.now },
  data: {
    type: Schema.Types.Mixed,
  },
});

// Compound index for faster cache lookup
SummonerSchema.index({
  normalizedGameName: 1,
  normalizedTagLine: 1,
  platform: 1,
});

SummonerSchema.index({ "data.riotAccount.puuid": 1 });

export default mongoose.models.Summoner ||
  mongoose.model<ISummoner>("Summoner", SummonerSchema);
