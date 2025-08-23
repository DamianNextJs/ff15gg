import mongoose, { Schema, Document } from "mongoose";

export interface ISummoner extends Document {
  puuid: string;
  gameName: string;
  tagLine: string;
  region: string;
  data: object;
  lastUpdated: Date;
}

const SummonerSchema = new Schema<ISummoner>({
  puuid: { type: String, required: true, unique: true },
  gameName: { type: String, required: true },
  tagLine: { type: String, required: true },
  region: { type: String, required: true },
  data: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now() },
});

export default mongoose.models.Summoner ||
  mongoose.model<ISummoner>("Summoner", SummonerSchema);
