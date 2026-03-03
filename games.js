export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;

  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${today}`,
      {
        headers: {
          "X-Auth-Token": API_KEY
        }
      }
    );

    const data = await response.json();

    const jogos = data.matches.map(match => ({
      home: match.homeTeam.name,
      away: match.awayTeam.name,
      competition: match.competition.name,
      status: match.status,
      utcDate: match.utcDate
    }));

    res.status(200).json(jogos);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar jogos" });
  }
}
