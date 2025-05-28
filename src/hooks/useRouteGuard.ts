import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useRouteGuard(
  requireGameStarted = false,
  requireGameFinished = false
) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const gameStarted = localStorage.getItem("game_started") === "true";
    const gameFinished = localStorage.getItem("game_finished") === "true";

    if (requireGameStarted && !gameStarted) {
      router.replace("/");
    }

    if (requireGameFinished && !gameFinished) {
      router.replace("/");
    }
  }, [requireGameStarted, requireGameFinished, router]);
}
