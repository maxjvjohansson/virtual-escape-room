"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { useEffect } from "react";
import StartScreen from "@/components/StartScreen/StartScreen";

export default function HomePage() {
  const { dispatch } = useGameContext();

  useEffect(() => {
    dispatch({ type: "RESET_GAME" });
  }, [dispatch]);

  return <StartScreen />;
}
