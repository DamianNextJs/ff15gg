import mongoose, { Schema, Document } from "mongoose";

export interface ISummoner extends Document {
  puuid: string;
  gameName: string;
  normalizedName: string;
  tagLine: string;
  platform: string;
  data: object;
  lastUpdated: Date;
}

const SummonerSchema = new Schema<ISummoner>({
  puuid: { type: String, required: true, unique: true },
  gameName: { type: String, required: true },
  normalizedName: { type: String, required: true, index: true },
  tagLine: { type: String, required: true },
  platform: { type: String, required: true },
  data: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now() },
});

export default mongoose.models.Summoner ||
  mongoose.model<ISummoner>("Summoner", SummonerSchema);
