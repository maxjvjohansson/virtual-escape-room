import React, { useState } from "react";
import { Riddle } from "./ComputerPuzzleRiddle";

type ComputerPuzzleScreenProps = {
  riddle: Riddle;
  onSuccess: () => void;
};

export default function ComputerPuzzleScreen({
  riddle,
  onSuccess,
}: ComputerPuzzleScreenProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.toLowerCase().trim() === riddle.answer.toLowerCase()) {
      onSuccess();
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <section>
      <h2>Windows XP</h2>
      <p>Password hint: {riddle?.question}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Log in</button>
      </form>
    </section>
  );
}
