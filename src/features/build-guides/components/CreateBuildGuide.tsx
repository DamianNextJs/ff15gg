import { useUser } from "@/features/auth/context/UserContext";
import { BuildGuide } from "@/types/buildGuide";
import { useState } from "react";

export default function CreateBuildGuide() {
  const { user } = useUser();
  const [buildGuide, setBuildGuide] = useState<BuildGuide>({
    title: "",
    creatorId: user?._id ?? "",
    stars: 0,
    championId: 0,
    championName: "",
    role: "",
    isAram: false,
    items: [],
    runes: {
      primaryTree: 0,
      secondaryTree: 0,
      primarySelection: [],
      secondarySelection: [],
      statShardSelection: [],
    },
    summonerSpells: [],
    skillOrder: [],
    counterChampionId: 0,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return <form action=""></form>;
}
