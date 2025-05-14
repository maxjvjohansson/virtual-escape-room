import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT player_name, time_ms FROM highscores ORDER BY time_ms ASC LIMIT 10"
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("GET /api/highscores error:", err);
    return NextResponse.json(
      { error: "Failed to fetch highscores " },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { playerName, timeMs } = await req.json();
    await pool.query(
      "INSERT INTO highscores (player_name, time_ms) VALUES ($1, $2)",
      [playerName, timeMs]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/highscores error:", err);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}
