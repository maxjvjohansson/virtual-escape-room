import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/lib/context/GameContext";

export default function useRouteGuard(
  requireGameStarted = false,
  requireGameFinished = false
) {
  const router = useRouter();
  const { state } = useGameContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lsGameStarted = localStorage.getItem("game_started") === "true";
    const lsGameFinished = localStorage.getItem("game_finished") === "true";

    const contextGameStarted = !!state.startedAt;
    const contextGameFinished = !!state.finishedAt;

    const hasStarted = lsGameStarted || contextGameStarted;
    const hasFinished = lsGameFinished || contextGameFinished;

    if (requireGameStarted && !hasStarted) {
      router.replace("/");
    }

    if (requireGameFinished && !hasFinished) {
      router.replace("/");
    }
  }, [
    requireGameStarted,
    requireGameFinished,
    state.startedAt,
    state.finishedAt,
    router,
  ]);
}
