import { useState, useEffect } from "react";
import { CachedSummoner } from "@/types/riot";
import { regionMap, RegionKey } from "@/lib/regionMap";

export function useCachedSummoners(
  query: string,
  region: RegionKey,
  delay = 300
) {
  const [results, setResults] = useState<CachedSummoner[]>([]);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || trimmedQuery.startsWith("#")) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchData = async () => {
        try {
          const platform = regionMap[region].platform;

          const res = await fetch(
            `/api/summoners/searchCached?search=${encodeURIComponent(
              trimmedQuery
            )}&platform=${platform}`
          );

          if (!res.ok) throw new Error("Failed to fetch cached summoners");

          const data: CachedSummoner[] = await res.json();

          setResults(data);
        } catch (error) {
          console.error(error);
          setResults([]);
        } finally {
        }
      };
      fetchData();
    }, delay);

    return () => clearTimeout(handler);
  }, [query, region, delay]);

  return { results };
}
