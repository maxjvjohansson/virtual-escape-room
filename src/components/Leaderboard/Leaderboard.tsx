"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";
import clsx from "clsx";
import { Cinzel } from "next/font/google";
import Image from "next/image";

type Score = {
  player_name: string;
  time_ms: number;
};

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      className={`max-w-2xl mx-auto p-8 border-2 border-purple-500/20 shadow-2xl text-white ${cinzel.className}`}
      style={{
        background:
          "linear-gradient(90deg, #111827 0%, #24243B 50%, #18181E 100%)",
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-3">
        <Image
          src="/images/trophy_yellow.svg"
          alt="Trophy Icon"
          width={36}
          height={36}
        />
        LEADERBOARD
      </h2>

      <div className="flex justify-between text-gray-400 font-semibold border-b border-gray-600 pb-2 mb-4 text-sm">
        <span className="w-1/6">Rank</span>
        <span className="w-3/6">Player</span>
        <span className="w-2/6 text-right">Time</span>
      </div>

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
        <ol className="space-y-2">
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
                className={clsx(
                  "flex items-center justify-between px-4 py-2 rounded-lg",
                  idx === 0
                    ? "bg-white/10"
                    : idx === 1 || idx === 2
                    ? "bg-white/5"
                    : "bg-transparent"
                )}
              >
                <span className="w-1/6 flex justify-center">
                  {medalSrc ? (
                    <Image
                      src={medalSrc}
                      alt="Medal"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-bold text-yellow-400">{idx + 1}</span>
                  )}
                </span>

                <span className="w-3/6 text-left truncate">
                  {score.player_name}
                </span>

                <span className="w-2/6 text-right">
                  {formatTime(score.time_ms)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
