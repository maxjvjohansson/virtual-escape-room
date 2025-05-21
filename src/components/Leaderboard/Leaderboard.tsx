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
    <section
      className="w-full p-8 text-white space-y-2 bg-cover"
      style={{ backgroundImage: "url('/images/dark_wall_texture.jpg')" }}
    >
      <h2 className="text-4xl font-bold text-[#B81B00] text-center mb-4">
        LEADERBOARD
      </h2>

      {error && (
        <p className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded">
          {error}
        </p>
      )}

      {!scores && !error && (
        <p className="text-center text-sm animate-pulse">Loading scores...</p>
      )}

      {scores?.length === 0 && <p className="text-center">No scores yet.</p>}

      {scores && (
        <ol className="space-y-4">
          {scores.map((score, idx) => {
            const medalSrc =
              idx === 0
                ? "/images/gold_medal.png"
                : idx === 1
                ? "/images/silver_medal.png"
                : idx === 2
                ? "/images/bronze_medal.png"
                : null;

            return (
              <li
                key={idx}
                className="flex items-center justify-between border-b border-white pb-1"
              >
                <span className="flex items-center gap-2">
                  {medalSrc && (
                    <img src={medalSrc} alt="Medal" className="w-12 h-auto" />
                  )}
                  {idx + 1}. {score.player_name}
                </span>
                <span>{formatTime(score.time_ms)}</span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
