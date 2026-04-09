const DEV = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_API_KEY;
const GUILD_ID = import.meta.env.VITE_GUILD_ID;

const cache = new Map<string, unknown>();

export const clearCache = () => cache.clear();

const cached = async <T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> => {
  if (cache.has(key)) return cache.get(key) as T;
  const result = await fetcher();
  cache.set(key, result);
  return result;
};

export const getGuildTreasury = async () =>
  cached("treasury", async () => {
    const url = DEV
      ? `/api/guild/${GUILD_ID}/treasury?access_token=${API_KEY}`
      : "/api/treasury";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching treasury: ${response.statusText}`);
    }
    return response.json();
  });

export const getGuildUpgradeDetails = async (ids: number[]) =>
  cached(`upgrades:${[...ids].sort().join(",")}`, async () => {
    const url = DEV
      ? `/api/guild/upgrades?ids=${ids.join(",")}&access_token=${API_KEY}`
      : `/api/upgrades?ids=${ids.join(",")}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching upgrade details: ${response.statusText}`);
    }
    return response.json();
  });

export const getItemDetails = async (ids: number[]) =>
  cached(`items:${[...ids].sort().join(",")}`, async () => {
    const url = `/api/items?ids=${ids.join(",")}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching item details: ${response.statusText}`);
    }
    return response.json();
  });
