"use client";

import { useState } from "react";
import { useGameContext } from "@/lib/context/GameContext";
import { formatTime } from "@/utils/formatTime";
import { useRouter } from "next/navigation";
import Button from "@/elements/Button";

export default function CodeLock() {
  const { state, dispatch } = useGameContext();
  const router = useRouter();

  const [inputs, setInputs] = useState({ A: "", B: "", C: "", D: "" });
  const [error, setError] = useState("");

  const handleChange =
    (key: "A" | "B" | "C" | "D") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({ ...inputs, [key]: e.target.value });
    };

  const handleSubmit = () => {
    const correctCode = state.code;

    const isCorrect =
      inputs.A === String(correctCode.A) &&
      inputs.B === String(correctCode.B) &&
      inputs.C === String(correctCode.C) &&
      inputs.D === String(correctCode.D);

    if (isCorrect) {
      dispatch({ type: "END_GAME" });

      setTimeout(() => {
        const { startedAt, finishedAt } = {
          startedAt: state.startedAt,
          finishedAt: Date.now(),
        };

        if (startedAt) {
          const elapsedMs = finishedAt - startedAt;
          const formattedTime = formatTime(elapsedMs);

          console.log(`Escaped in ${formattedTime}`);
        }

        router.push("/endgame");
      }, 100);
    } else {
      setError("Incorrect code. Try again.");
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Enter Escape Code</h2>

      <div className="grid grid-cols-4 gap-2">
        {(["A", "B", "C", "D"] as const).map((key) => (
          <input
            key={key}
            type="number"
            min={0}
            max={9}
            value={inputs[key]}
            onChange={handleChange(key)}
            className="w-full p-2 text-center border rounded"
            maxLength={1}
            placeholder={key}
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button onClick={handleSubmit}>Unlock</Button>
    </section>
  );
}
