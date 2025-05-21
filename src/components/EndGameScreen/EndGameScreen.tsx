"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { awardStamp } from "@/lib/api/transactionService";
import { formatTime } from "@/utils/formatTime";
import Button from "@/elements/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";

type Score = {
  player_name: string;
  time_ms: number;
};

export default function EndGameScreen() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [wouldQualify, setWouldQualify] = useState(false);
  const [requiredTimeMs, setRequiredTimeMs] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [medalStatus, setMedalStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { state, dispatch } = useGameContext();
  const router = useRouter();

  const checkIfQualifies = useCallback(async () => {
    setIsChecking(true);
    const playerTime = state.finishedAt! - state.startedAt!;

    try {
      const res = await fetch("/api/highscores", { cache: "no-store" });
      const data: Score[] = await res.json();

      const sorted = data
        .filter((entry: Score) => typeof entry.time_ms === "number")
        .sort((a: Score, b: Score) => a.time_ms - b.time_ms);

      if (sorted.length === 0) {
        setWouldQualify(true);
        setRequiredTimeMs(null);
      } else {
        const top10 = sorted.slice(0, 10);
        const slowestTime = top10.length === 10 ? top10[9].time_ms : null;

        const qualifies =
          top10.length < 10 ||
          (slowestTime !== null && playerTime < slowestTime);

        setWouldQualify(qualifies);
        setRequiredTimeMs(slowestTime);
      }
    } catch (err) {
      console.error("Leaderboard fetch failed:", err);
      setWouldQualify(true);
    } finally {
      setIsChecking(false);
    }
  }, [state.finishedAt, state.startedAt]);

  useEffect(() => {
    if (!state.startedAt || !state.finishedAt) return;

    const timeout = setTimeout(() => {
      checkIfQualifies();
    }, 300);

    return () => clearTimeout(timeout);
  }, [state.startedAt, state.finishedAt, checkIfQualifies]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !state.startedAt || !state.finishedAt) return;

    const giveStampReward = async () => {
      setMedalStatus("loading");

      try {
        await awardStamp(jwt);
        setMedalStatus("success");
      } catch {
        setMedalStatus("error");
      }
    };

    giveStampReward();
  }, [state.startedAt, state.finishedAt]);

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

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit score");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? String(err.message)
          : "Could not submit score."
      );
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
      <h1 className="text-3xl font-bold">
        Well done, {state.playerName || "Houdini"}!
      </h1>
      <h2 className="text-2xl font-semibold">You Escaped!</h2>

      <p className="text-xl">Your Time: {timeTaken}</p>

      {medalStatus === "loading" && (
        <p className="text-yellow-400 text-sm italic">Awarding your medal...</p>
      )}

      {medalStatus === "success" && (
        <p className="text-green-400 text-sm italic">You earned a medal!</p>
      )}

      {medalStatus === "error" && (
        <p className="text-red-400 text-sm italic">Failed to grant medal.</p>
      )}

      <div className="flex flex-col gap-4 mt-6">
        {state.startedAt && state.finishedAt && !isChecking && (
          <>
            {wouldQualify ? (
              <p className="text-green-400 text-sm italic">
                Your time qualifies for the leaderboard!
              </p>
            ) : (
              <p className="text-red-400 text-sm italic">
                You need to beat{" "}
                <strong>
                  {requiredTimeMs !== null
                    ? formatTime(requiredTimeMs)
                    : "unknown"}
                </strong>{" "}
                to enter the top 10.
              </p>
            )}
          </>
        )}

        {!submitted ? (
          <Button
            onClick={handleSubmitScore}
            disabled={loading || !wouldQualify || isChecking}
            className={
              wouldQualify
                ? "bg-blue-600 hover:bg-blue-800"
                : "bg-zinc-600 opacity-50 cursor-not-allowed"
            }
          >
            {loading
              ? "Submitting..."
              : isChecking
              ? "Checking..."
              : wouldQualify
              ? "Submit Score"
              : "Not Eligible for Leaderboard"}
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
