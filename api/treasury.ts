import { corsHeaders, handlePreflight } from "./_cors";

export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
  if (request.method === "OPTIONS") return handlePreflight();

  const res = await fetch(
    `https://api.guildwars2.com/v2/guild/${process.env.VITE_GUILD_ID}/treasury?access_token=${process.env.CLIENT_API_KEY}`,
  );
  const data = await res.json();
  return Response.json(data, { status: res.status, headers: corsHeaders });
}
