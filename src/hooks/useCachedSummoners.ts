import { useState, useEffect } from "react";
import { SummonerData } from "@/types/summoner";
import { regionMap, RegionKey } from "@/lib/maps/regionMap";
import { useDebounce } from "./useDebounce";

export function useCachedSummoners(query: string, region: RegionKey) {
  const debouncedQuery = useDebounce(query.trim(), 300);
  const [results, setResults] = useState<SummonerData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.startsWith("#")) {
      setResults([]);
      setLoading(false); // reset loading for empty or invalid query
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true); // start loading before fetch
      try {
        const platform = regionMap[region].platform;

        const res = await fetch(
          `/api/summoners/searchCached?search=${encodeURIComponent(
            debouncedQuery
          )}&platform=${platform}`,
          { signal }
        );

        if (!res.ok) throw new Error("Failed to fetch cached summoners");

        const data: SummonerData[] = await res.json();
        setResults(data);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(error);
          setResults([]);
        }
      } finally {
        setLoading(false); // stop loading after fetch (success or error)
      }
    };

    fetchData();

    return () => controller.abort();
  }, [debouncedQuery, region]);

  return { results, loading };
}
