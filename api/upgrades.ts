export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
  const ids = new URL(request.url).searchParams.get('ids');
  const res = await fetch(
    `https://api.guildwars2.com/v2/guild/upgrades?ids=${ids}&access_token=${process.env.CLIENT_API_KEY}`,
  );
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
