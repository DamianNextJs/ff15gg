import { BuildGuide } from "@/types/buildGuide";
import mongoose, { Schema, Document } from "mongoose";

export interface IBuildGuide
  extends Omit<BuildGuide, "_id" | "createdAt" | "updatedAt" | "creatorId">,
    Document {
  creatorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BuildGuideSchema = new Schema<IBuildGuide>(
  {
    title: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stars: { type: Number, default: 0 },
    championId: { type: Number, required: true },
    championName: { type: String, required: true },
    role: { type: String, required: true },
    isAram: { type: Boolean, required: true },
    items: { type: [Number], required: true },
    runes: {
      primaryTree: { type: Number, required: true },
      secondaryTree: { type: Number, required: true },
      primarySelection: { type: [Number], required: true },
      secondarySelection: { type: [Number], required: true },
      statShardSelection: { type: [Number], required: true },
      _id: false,
    },
    summonerSpells: { type: [Number], required: true },
    skillOrder: { type: [Number], required: true },
    counterChampionId: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.BuildGuide ||
  mongoose.model<IBuildGuide>("BuildGuide", BuildGuideSchema);
