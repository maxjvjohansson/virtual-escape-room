"use client";

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
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!startedAt || finishedAt) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 10); //  <-- Adjust ms refresh rate

    return () => clearInterval(interval);
  }, [startedAt, finishedAt]);

  if (!startedAt) return null;

  const elapsed = finishedAt ? finishedAt - startedAt : now - startedAt;
  const remaining = Math.max(durationMs - elapsed, 0);

  return (
    <div
      className="fixed bottom-24 w-auto h-16 bg-black bg-opacity-80 text-yellow-300 text-3xl px-4 flex items-center justify-center rounded-lg shadow-lg border border-yellow-500 tracking-widest"
      style={{ fontFamily: "monospace" }}
    >
      {formatTime(remaining)}
    </div>
  );
}
