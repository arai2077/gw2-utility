export const config = {
  runtime: 'edge',
};

export default function handler(_request: Request): Response {
  return Response.json({ apiKey: process.env.CLIENT_API_KEY });
}
