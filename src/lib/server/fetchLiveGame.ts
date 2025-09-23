import { getLiveGame, getRiotAccount } from "@/helper/riotApi";
import { LiveGameData } from "@/types/live-game";
import { RiotAccount } from "@/types/riot";
import { getCachedLiveGame, setCachedLiveGame } from "./cacheLiveGame";
import { mapLiveGame } from "@/helper/mappers";

export async function fetchLiveGame(
  region: string,
  platform: string,
  gameName: string,
  tagLine: string
): Promise<LiveGameData | null> {
  // Check cache first
  const cacheKey = `${region}:${platform}:${gameName}:${tagLine}`;
  const cached = getCachedLiveGame(cacheKey);
  if (cached !== undefined) {
    console.log(
      cached
        ? `[LiveGame] Cache hit for ${cacheKey}`
        : `[LiveGame] Cache hit (no live game) for ${cacheKey}`
    );
    return cached;
  }

  console.log(
    `[LiveGame] Cache miss for ${cacheKey}, fetching from Riot API...`
  );

  // Get Riot Account
  const riotAccount: RiotAccount = await getRiotAccount(
    gameName,
    tagLine,
    region
  );

  // Get Live Game with puuid from Riot Account
  const liveGame = await getLiveGame(riotAccount.puuid, platform);

  // Map and filter Live Game to exclude unwanted fields and unsupported queues
  const mappedLiveGame = mapLiveGame(liveGame);
  if (!mappedLiveGame) {
    console.log(`[LiveGame] No live game or unsupported queue for ${cacheKey}`);
    setCachedLiveGame(cacheKey, null, 15_000);
    return null;
  }

  const liveGameData: LiveGameData = {
    riotAccount,
    liveGame: mappedLiveGame,
  };

  // Store in cache for 30 seconds
  setCachedLiveGame(cacheKey, liveGameData, 30_000);

  console.log(`[LiveGame] Live game fetched and cached for ${cacheKey}`);

  return liveGameData;
}
