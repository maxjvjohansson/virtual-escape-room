"use client";

import EndGameScreen from "@/components/EndGameScreen/EndGameScreen";
import GameGuard from "@/components/GameGuard/GameGuard";

export default function EndGame() {
  return (
    <GameGuard requireGameFinished={true}>
      <EndGameScreen />
    </GameGuard>
  );
}
