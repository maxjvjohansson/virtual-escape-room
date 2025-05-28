"use client";

import BasementRoom from "@/components/BasementRoom/BasementRoom";
import GameGuard from "@/components/GameGuard/GameGuard";

export default function BasementPage() {
  return (
    <GameGuard requireGameStarted={true}>
      <BasementRoom />
    </GameGuard>
  );
}
