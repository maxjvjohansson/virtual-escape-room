"use client";

import { useGameContext } from "@/lib/context/GameContext";
import { useEffect } from "react";
import LobbyScreen from "@/components/LobbyScreen/LobbyScreen";

export default function LobbyPage() {
  const { dispatch } = useGameContext();

  useEffect(() => {
    dispatch({ type: "RESET_GAME" });
  }, [dispatch]);

  return <LobbyScreen />;
}
