export async function getLatestDDragonVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
      { cache: "no-store" }
    );
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
  } catch (error) {
    console.error("Failed to fetch data dragon version", error);
  }
  return " 15.16.1";
}
