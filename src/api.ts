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

const getApiKey = (() => {
  let cached: string | null = null;
  return async () => {
    if (cached) return cached;
    if (import.meta.env.DEV) {
      cached = import.meta.env.VITE_API_KEY;
    } else {
      const res = await fetch("https://gw2-utility.vercel.app/api/key");
      const data = await res.json();
      cached = data.apiKey;
    }
    return cached;
  };
})();

export const getGuildTreasury = async () =>
  cached("treasury", async () => {
    const apiKey = await getApiKey();
    const response = await fetch(
      `/api/guild/${GUILD_ID}/treasury?access_token=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching treasury: ${response.statusText}`);
    }

    return response.json();
  });

export const getGuildUpgradeDetails = async (ids: number[]) =>
  cached(`upgrades:${[...ids].sort().join(",")}`, async () => {
    const apiKey = await getApiKey();
    const response = await fetch(
      `/api/guild/upgrades?ids=${ids.join(",")}&access_token=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching upgrade details: ${response.statusText}`);
    }

    return response.json();
  });

export const getItemDetails = async (ids: number[]) =>
  cached(`items:${[...ids].sort().join(",")}`, async () => {
    const apiKey = await getApiKey();
    const response = await fetch(
      `/api/items?ids=${ids.join(",")}&access_token=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching item details: ${response.statusText}`);
    }

    return response.json();
  });
