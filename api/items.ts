export const config = { runtime: 'edge' };

export default async function handler(request: Request): Promise<Response> {
  const ids = new URL(request.url).searchParams.get('ids');
  const res = await fetch(`https://api.guildwars2.com/v2/items?ids=${ids}`);
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
