"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";

type Score = {
  player_name: string;
  time_ms: number;
};

export default function Leaderboard() {
  const [scores, setScores] = useState<Score[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await fetch("/api/highscores");
        if (!res.ok) throw new Error("Failed to fetch highscores");

        const data: Score[] = await res.json();
        setScores(data);
      } catch (err) {
        setError("Could not load leaderboard");
        console.error(err);
      }
    };

    fetchScores();
  }, []);

  return (
    <section className="w-full max-w-sm space-y-2">
      <h2 className="text-2xl font-bold text-center mb-4">Leaderboard</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!scores && !error && (
        <p className="text-center text-sm animate-pulse">Loading scores...</p>
      )}

      {scores?.length === 0 && <p className="text-center">No scores yet.</p>}

      {scores && (
        <ol className="space-y-2">
          {scores.map((score, idx) => (
            <li
              key={idx}
              className="flex justify-between border-b border-white/20 pb-1"
            >
              <span>
                {idx + 1}. {score.player_name}
              </span>
              <span>{formatTime(score.time_ms)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
