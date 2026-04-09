export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://gw2-utility.vercel.app",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function handlePreflight(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}
