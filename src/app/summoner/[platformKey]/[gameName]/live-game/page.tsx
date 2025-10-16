import LiveGameInfo from "@/features/profilepage/live-game/components/LiveGameInfo";
import LiveGameParticipants from "@/features/profilepage/live-game/components/LiveGameParticipants";
import NotInGame from "@/features/profilepage/live-game/components/NotInGame";
import { fetchLiveGame } from "@/features/profilepage/live-game/lib/fetchLiveGame";
import { parseSummonerParams } from "@/features/profilepage/utils/parseSummonerParams";
import BannedChampions from "@/features/shared/components/BannedChampions";

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
      <div className="mb-4">
        <BannedChampions
          bannedChampions={liveGameData.liveGame.bannedChampions}
        />
      </div>
      <LiveGameParticipants
        platform={platform}
        myPuuid={liveGameData.riotAccount.puuid}
        liveGameParticipants={liveGameData.liveGame.participants}
      />
    </div>
  );
}
