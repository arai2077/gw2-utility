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
    const response = await fetch("/api/treasury");
    if (!response.ok) {
      throw new Error(`Error fetching treasury: ${response.statusText}`);
    }
    return response.json();
  });

export const getGuildUpgradeDetails = async (ids: number[]) =>
  cached(`upgrades:${[...ids].sort().join(",")}`, async () => {
    const response = await fetch(`/api/upgrades?ids=${ids.join(",")}`);
    if (!response.ok) {
      throw new Error(`Error fetching upgrade details: ${response.statusText}`);
    }
    return response.json();
  });

export const getItemDetails = async (ids: number[]) =>
  cached(`items:${[...ids].sort().join(",")}`, async () => {
    const response = await fetch(`/api/items?ids=${ids.join(",")}`);
    if (!response.ok) {
      throw new Error(`Error fetching item details: ${response.statusText}`);
    }
    return response.json();
  });
