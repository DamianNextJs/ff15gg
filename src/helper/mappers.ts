import { queueMap } from "@/lib/maps/queueMap";
import { LiveGame } from "@/types/live-game";
import { ChampionMastery, MatchData, SummonerData } from "@/types/riot";

// --- Mapping helpers ---
export function mapChampionMastery(raw: ChampionMastery[]): ChampionMastery[] {
  return raw.map((c) => ({
    championId: c.championId,
    championLevel: c.championLevel,
    championPoints: c.championPoints,
  }));
}

export function mapRanked(raw: SummonerData["ranked"]): SummonerData["ranked"] {
  return raw?.map((r) => ({
    queueType: r.queueType,
    tier: r.tier,
    rank: r.rank,
    wins: r.wins,
    losses: r.losses,
    leaguePoints: r.leaguePoints,
  }));
}

export function mapMatches(raw: MatchData[]): MatchData[] {
  return raw
    .filter((m) => queueMap[m.info.queueId])
    .map((m) => ({
      metadata: {
        matchId: m.metadata.matchId,
      },
      info: {
        gameMode: m.info.gameMode,
        gameEndTimestamp: m.info.gameEndTimestamp,
        gameDuration: m.info.gameDuration,
        queueId: m.info.queueId,
        platformId: m.info.platformId,
        participants: m.info.participants.map((p) => ({
          puuid: p.puuid,
          riotIdGameName: p.riotIdGameName,
          riotIdTagline: p.riotIdTagline,
          championName: p.championName,
          teamId: p.teamId,
          profileIcon: p.profileIcon,
          championId: p.championId,
          champLevel: p.champLevel,
          kills: p.kills,
          deaths: p.deaths,
          assists: p.assists,
          win: p.win,
          visionScore: p.visionScore,
          summoner1Id: p.summoner1Id,
          summoner2Id: p.summoner2Id,
          neutralMinionsKilled: p.neutralMinionsKilled,
          totalMinionsKilled: p.totalMinionsKilled,
          perks: p.perks,
          item0: p.item0,
          item1: p.item1,
          item2: p.item2,
          item3: p.item3,
          item4: p.item4,
          item5: p.item5,
          item6: p.item6,
        })),
      },
    }));
}

export function mapLiveGame(raw: LiveGame | null): LiveGame | null {
  // Only keep supported queue
  if (!raw || !(raw.gameQueueConfigId in queueMap)) return null;

  return {
    gameQueueConfigId: raw.gameQueueConfigId,
    gameLength: raw.gameLength,
    bannedChampions: raw.bannedChampions.map((b) => ({
      championId: b.championId,
      teamId: b.teamId,
      pickTurn: b.pickTurn,
    })),
    participants: raw.participants.map((p) => ({
      puuid: p.puuid,
      teamId: p.teamId,
      spell1Id: p.spell1Id,
      spell2Id: p.spell2Id,
      championId: p.championId,
      profileIconId: p.profileIconId,
      riotId: p.riotId,
      perks: {
        perkIds: p.perks.perkIds,
        perkStyle: p.perks.perkStyle,
        perkSubStyle: p.perks.perkSubStyle,
      },
    })),
  };
}
