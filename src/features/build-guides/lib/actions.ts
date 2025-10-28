"use server";
import BuildGuide from "@/database/models/BuildGuide";
import { connectToDB } from "@/database/mongodb";
import { BuildGuide as BuildGuideType } from "@/types/buildGuide";

export async function createBuildGuide(body: BuildGuideType) {
  await connectToDB();

  return BuildGuide.create({ ...body });
}

export async function getBuildGuides() {
  await connectToDB();

  return BuildGuide.find().populate("User").sort({ createdAt: -1 }).limit(20);
}

export async function getBuildGuide(_id: string) {
  await connectToDB();

  return BuildGuide.findById(_id);
}

export async function updateBuildGuide(_id: string, body: BuildGuideType) {
  await connectToDB();

  return BuildGuide.findByIdAndUpdate({ _id }, { ...body }, { new: true });
}

export async function deleteBuildGuide(_id: string) {
  await connectToDB();

  return BuildGuide.findByIdAndDelete(_id);
}
