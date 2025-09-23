import { parseSummonerParams } from "@/helper/parseSummonerParams";
import NotInGame from "./components/NotInGame";
import { fetchLiveGame } from "@/lib/server/fetchLiveGame";
import BannedChampions from "./components/BannedChampions";
import LiveGameInfo from "./components/LiveGameInfo";
import LiveGameParticipants from "./components/LiveGameParticipants";

interface LiveGameProps {
  params: Promise<{
    platformKey: string;
    gameName: string;
  }>;
}

export default async function LiveGame({ params }: LiveGameProps) {
  const { name, tag, region, platform } = parseSummonerParams(await params);

  let liveGameData;
  try {
    liveGameData = await fetchLiveGame(region, platform, name, tag);
  } catch (error) {
    console.log("Error fetching Live Game", error);
  }

  if (!liveGameData) return <NotInGame name={name} tag={tag} />;

  return (
    <div className="p-4 pb-0 bg-secondary rounded-md -mt-1 flex flex-col gap-4">
      <LiveGameInfo
        gameQueue={liveGameData.liveGame.gameQueueConfigId}
        gameLength={liveGameData.liveGame.gameLength}
      />
      <BannedChampions
        bannedChampions={liveGameData.liveGame.bannedChampions}
      />
      <LiveGameParticipants
        platform={platform}
        myPuuid={liveGameData.riotAccount.puuid}
        liveGameParticipants={liveGameData.liveGame.participants}
      />
    </div>
  );
}
