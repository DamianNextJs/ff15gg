import mongoose, { Schema, Document } from "mongoose";
import { MatchData } from "@/types/match";

export interface IMatch extends Document {
  data: MatchData;
}

const MatchSchema = new Schema<IMatch>({
  data: { type: Schema.Types.Mixed, required: true },
});

// Index nested matchId for fast lookup
MatchSchema.index({ "data.metadata.matchId": 1 }, { unique: true });

export default mongoose.models.Match ||
  mongoose.model<IMatch>("Match", MatchSchema);
