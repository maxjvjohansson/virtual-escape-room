"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { formatTime } from "@/utils/formatTime";
import Button from "@/elements/Button";
import { useRouter } from "next/navigation";

export default function EndGameScreen() {
  const { state } = useGameContext();
  const router = useRouter();

  const timeTaken =
    state.startedAt && state.finishedAt
      ? formatTime(state.finishedAt - state.startedAt)
      : "Unknown";

  const handlePlayAgain = () => {
    router.push("/lobby");
  };

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-6 text-white text-center"
      style={{ backgroundImage: "url('/images/haunted_mansion.png')" }}
    >
      <h1 className="text-4xl font-bold">You Escaped!</h1>
      <p className="text-xl">Time: {timeTaken}</p>
      <p className="text-lg italic">
        Well done, {state.playerName || "Houdini"}.
      </p>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          className="bg-green-600 hover:bg-green-800"
          onClick={handlePlayAgain}
        >
          Play Again
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-800">
          View Leaderboard
        </Button>
      </div>
    </section>
  );
}
