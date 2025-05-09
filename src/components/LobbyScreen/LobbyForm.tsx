"use client";

import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InstructionsModal from "../Instructions/InstructionsModal";

export default function LobbyForm() {
  const [showInstructions, setShowInstructions] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Validate/Charge user, also generate the code for codelock
    router.push("/basement");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black/60 p-6 rounded-xl w-full max-w-md mx-auto flex flex-col gap-6"
    >
      <InputField
        id="playerName"
        placeholder="Enter your name"
        className="w-full"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-lg">Ticket Price: 2€</p>
        <Button type="button" className="bg-purple-600 hover:bg-purple-700">
          Buy Ticket
        </Button>
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
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
