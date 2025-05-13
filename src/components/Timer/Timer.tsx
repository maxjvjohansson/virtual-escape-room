"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/utils/formatTime";
import { finished } from "stream";

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
    }, 1000);

    return () => clearInterval(interval);
  }, [startedAt, finishedAt]);

  if (!startedAt) return null;

  const elapsed = finishedAt ? finishedAt - startedAt : now - startedAt;
  const remaining = Math.max(durationMs - elapsed, 0);

  return (
    <div className="text-lg font-mono">Time left: {formatTime(remaining)}</div>
  );
}
