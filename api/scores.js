export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const apiKey = process.env.FD_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'FD_API_KEY not configured in Vercel environment variables' });
  }

  try {
    const r = await fetch(
      'https://api.football-data.org/v4/competitions/WC/matches?season=2026',
      { headers: { 'X-Auth-Token': apiKey } }
    );
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
