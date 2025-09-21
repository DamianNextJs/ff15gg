import { RegionKey, regionMap } from "@/lib/maps/regionMap";

export function parseSummonerParams(params: {
  platformKey: string;
  gameName: string;
}) {
  const { platformKey, gameName } = params;

  const { platform, region } = regionMap[platformKey as RegionKey];
  const [name, tag = ""] = decodeURIComponent(gameName).split("-");

  return {
    name,
    tag,
    platform,
    region,
  };
}
