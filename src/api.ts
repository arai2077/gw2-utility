const API_KEY = import.meta.env.VITE_API_KEY;
const GUILD_ID = import.meta.env.VITE_GUILD_ID;

export const getGuildTreasury = async () => {
  const response = await fetch(
    `/api/guild/${GUILD_ID}/treasury?access_token=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Error fetching treasury: ${response.statusText}`);
  }

  return response.json();
};

export const getItemDetails = async (ids: number[]) => {
  const response = await fetch(`/api/items?ids=${ids.join(",")}`);

  if (!response.ok) {
    throw new Error(`Error fetching item details: ${response.statusText}`);
  }

  return response.json();
};
