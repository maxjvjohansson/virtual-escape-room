"use client";

import { useState } from "react";
import { useGameContext } from "@/lib/context/GameContext";
import { formatTime } from "@/utils/formatTime";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/elements/Button";
import { ChevronUp, ChevronDown } from "lucide-react";

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
    <section className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl font-semibold">Enter Escape Code</h2>

      <div className="grid grid-cols-4 gap-4 bg-[#3d342a] p-8 rounded-2xl">
        {(["A", "B", "C", "D"] as const).map((key) => (
          <div key={key} className="flex flex-col items-center">
            <span className="text-xl text-white font-bold mb-1">{key}</span>

            <div className="p-2 rounded-lg shadow-inner flex flex-col items-center gap-4">
              <Button
                type="button"
                onClick={() =>
                  setInputs((prev) => ({
                    ...prev,
                    [key]: String((+prev[key] + 1) % 10),
                  }))
                }
                className="text-white hover:text-yellow-300 border-2"
              >
                <ChevronUp size={24} />
              </Button>

              <input
                type="text"
                value={inputs[key] || "0"}
                readOnly
                className="w-12 h-12 text-center text-xl text-white border-2 border-yellow-400 rounded-full bg-gray-700 select-none pointer-events-none"
              />

              <Button
                type="button"
                onClick={() =>
                  setInputs((prev) => ({
                    ...prev,
                    [key]: String((+prev[key] + 9) % 10),
                  }))
                }
                className="text-white hover:text-yellow-300 border-2"
              >
                <ChevronDown size={24} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg shadow-lg transition"
        onClick={handleSubmit}
      >
        Unlock
      </Button>
    </section>
  );
}
