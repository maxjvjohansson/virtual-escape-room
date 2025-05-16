"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";

type TimerProps = {
  startedAt: number | null;
  finishedAt: number | null;
  durationMs?: number;
};

export default function Timer({
  startedAt,
  finishedAt,
  durationMs = 60 * 60 * 1000,
}: TimerProps) {
  const { dispatch, state } = useGameContext();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!startedAt || finishedAt) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 10);

    return () => clearInterval(interval);
  }, [startedAt, finishedAt]);

  const elapsed =
    startedAt != null
      ? finishedAt
        ? finishedAt - startedAt
        : now - startedAt
      : 0;

  const remaining = Math.max(durationMs - elapsed, 0);

  useEffect(() => {
    if (
      startedAt &&
      remaining === 0 &&
      !state.finishedAt &&
      !state.isGameOver
    ) {
      dispatch({ type: "GAME_OVER" });
    }
  }, [startedAt, remaining, state.finishedAt, state.isGameOver, dispatch]);

  if (!startedAt) return null;

  return (
    <div className="flex flex-col items-center py-2 px-4 justify-center border border-yellow-500 rounded-2xl">
      <div
        className="text-yellow-400 text-6xl font-digital tracking-widest"
        style={{
          textShadow: `
        0 0 4px #78620e,
        0 0 8px #78620e,
        0 0 16px #78620e,
        0 0 20px #78620e
      `,
        }}
      >
        {formatTime(remaining)}
      </div>
    </div>
  );
}
