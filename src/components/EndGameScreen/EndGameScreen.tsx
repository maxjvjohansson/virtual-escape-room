"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { awardStamp } from "@/lib/api/transactionService";
import { formatTime } from "@/utils/formatTime";
import Button from "@/elements/Button";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";
import TrophyIcon from "@assets/icons/trophy_black.svg";
import DoorIcon from "@assets/icons/door_white.svg";
import CheckBoxIcon from "@assets/icons/checkbox_white.svg";
import CrossIcon from "@assets/icons/close_x_white.svg";
import StampAward from "../StampAward/StampAward";
import useRouteGuard from "@/hooks/useRouteGuard";

type Score = {
  player_name: string;
  time_ms: number;
};

export default function EndGameScreen() {
  useRouteGuard(false, true);

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
      style={{ backgroundImage: "url('/images/mansion_bg.png')" }}
    >
      <h1 className="text-3xl font-bold">
        Well done, {state.playerName || "Houdini"}!
      </h1>
      <h2 className="text-2xl font-semibold">You Escaped!</h2>

      <p className="text-xl">Your Time: {timeTaken}</p>

      {medalStatus === "loading" && (
        <p className="bg-yellow-100 text-yellow-800 text-center p-3 mb-4 rounded">
          Awarding your medal...
        </p>
      )}

      {medalStatus === "success" && (
        <>
          <div className="flex flex-col justify-center items-center gap-4 bg-green-100 text-green-800 text-center p-3 mb-4 rounded">
            <p>You&apos;ve been awarded a Gold Raven stamp!</p>
            <StampAward />
          </div>
        </>
      )}

      {medalStatus === "error" && (
        <p className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded">
          Failed to grant medal.
        </p>
      )}

      <div className="flex flex-col gap-4 mt-6">
        {state.startedAt && state.finishedAt && !isChecking && (
          <>
            {wouldQualify ? (
              <p className="bg-green-100 text-green-800 text-center p-3 mb-4 rounded">
                Your time qualifies for the leaderboard!
              </p>
            ) : (
              <p className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded">
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
            variant={
              loading || !wouldQualify || isChecking
                ? "disabled"
                : "primary-purple"
            }
          >
            {loading || isChecking ? null : wouldQualify ? (
              <CheckBoxIcon />
            ) : (
              <CrossIcon />
            )}

            {loading
              ? "Submitting..."
              : isChecking
              ? "Checking..."
              : wouldQualify
              ? "Submit Score"
              : "Not Eligible for Leaderboard"}
          </Button>
        ) : (
          <p className="bg-green-100 text-green-800 text-center p-3 mb-4 rounded">
            Score submitted!
          </p>
        )}

        {error && (
          <p className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded">
            {error}
          </p>
        )}

        <Button
          variant="primary-yellow"
          onClick={() => setShowLeaderboard(true)}
        >
          <TrophyIcon />
          View Leaderboard
        </Button>

        <Button variant="primary-green" onClick={handlePlayAgain}>
          <DoorIcon />
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
