"use client";

import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGameContext } from "@/lib/context/GameContext";
import InstructionsModal from "../Instructions/InstructionsModal";
import { buyTicket } from "@/lib/api/tivoli";

export default function LobbyForm() {
  const { dispatch } = useGameContext();
  const [playerName, setPlayerName] = useState("");
  const [ticketBought, setTicketBought] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  const handleBuyTicket = async () => {
    setError("");

    if (!playerName.trim()) {
      setError("Please enter a player name before buying a ticket.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("jwt");

      if (!token) {
        setError("Missing token. Are you logged in via Tivoli?");
        return;
      }

      await buyTicket(token);

      dispatch({ type: "SET_HAS_TICKET", payload: true });
      setTicketBought(true);
    } catch (err) {
      console.error(err);
      setError("Could not complete transaction.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ticketBought) return;

    dispatch({ type: "SET_PLAYER_NAME", payload: playerName });
    dispatch({ type: "GENERATE_ESCAPE_CODE" });
    dispatch({ type: "START_GAME" });

    setTimeout(() => {
      router.push("/basement");
    }, 200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/60 p-6 rounded-xl w-full max-w-md mx-auto flex flex-col gap-6"
    >
      <InputField
        id="playerName"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value);
          if (error) setError("");
        }}
        className="w-full"
        required
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-lg">Ticket Price: 3€</p>
        <Button
          type="button"
          className={
            ticketBought
              ? "bg-green-700 cursor-default"
              : "bg-purple-600 hover:bg-purple-700"
          }
          onClick={handleBuyTicket}
          disabled={ticketBought || loading}
        >
          {ticketBought
            ? "Ticket Bought"
            : loading
            ? "Processing..."
            : "Buy Ticket"}
        </Button>
      </div>

      {!ticketBought && (
        <p className="text-yellow-400 text-sm italic">
          You must buy a ticket before starting the game.
        </p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={!ticketBought}
        className={
          ticketBought
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-600 opacity-50 cursor-not-allowed"
        }
      >
        Start Game
      </Button>

      <Button
        type="button"
        className="bg-gray-600 hover:bg-gray-700"
        onClick={() => setShowInstructions(true)}
      >
        Instructions
      </Button>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </form>
  );
}
