import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameContext } from "@/lib/context/GameContext";

export default function GameGuard({
  requireGameStarted = false,
  requireGameFinished = false,
  children,
}: {
  requireGameStarted?: boolean;
  requireGameFinished?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();
  const { state } = useGameContext();

  useEffect(() => {
    if (requireGameStarted && !state.startedAt) {
      router.replace("/");
      return;
    }

    if (requireGameFinished && !state.finishedAt) {
      router.replace("/");
      return;
    }
  }, [
    requireGameStarted,
    requireGameFinished,
    state.startedAt,
    state.finishedAt,
    router,
  ]);

  if (requireGameStarted && !state.startedAt) {
    return null;
  }

  if (requireGameFinished && !state.finishedAt) {
    return null;
  }

  return children;
}
