"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { formatTime } from "@/utils/formatTime";
import Button from "@/elements/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";

export default function EndGameScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const { state, dispatch } = useGameContext();
  const router = useRouter();

  const handleSubmitScore = async () => {
    if (!state.playerName || !state.startedAt || !state.finishedAt) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/highscores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerName: state.playerName,
          timeMs: state.finishedAt - state.startedAt,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit score");

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Could not submit score.");
    } finally {
      setLoading(false);
    }
  };

  const timeTaken =
    state.startedAt && state.finishedAt
      ? formatTime(state.finishedAt - state.startedAt)
      : "Unknown";

  const handlePlayAgain = () => {
    dispatch({ type: "RESET_GAME" });
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
        {!submitted ? (
          <Button
            onClick={handleSubmitScore}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-800"
          >
            {loading ? "Submitting..." : "Submit Score"}
          </Button>
        ) : (
          <p className="text-green-400 text-sm italic">Score submitted!</p>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          className="bg-purple-600 hover:bg-purple-800"
          onClick={() => setShowLeaderboard(true)}
        >
          View Leaderboard
        </Button>

        <Button
          className="bg-green-600 hover:bg-green-800"
          onClick={handlePlayAgain}
        >
          Play Again
        </Button>
        {showLeaderboard && (
          <LeaderboardModal
            isOpen={showLeaderboard}
            onClose={() => setShowLeaderboard(false)}
          />
        )}
      </div>
    </section>
  );
}
