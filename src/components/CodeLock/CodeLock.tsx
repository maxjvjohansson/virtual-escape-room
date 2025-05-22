"use client";

import { useState } from "react";
import { useGameContext } from "@/lib/context/GameContext";
import { formatTime } from "@/utils/formatTime";
import { useRouter } from "next/navigation";
import Button from "@/elements/Button";
import ArrowUpIcon from "@assets/icons/arrow_up_white.svg";
import ArrowDownIcon from "@assets/icons/arrow_down_white.svg";
import UnlockIcon from "@assets/icons/lock_open_black.svg";

export default function CodeLock() {
  const { state, dispatch } = useGameContext();
  const router = useRouter();

  const [inputs, setInputs] = useState({ A: "0", B: "0", C: "0", D: "0" });
  const [error, setError] = useState("");

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
    <section className="flex items-center z-0 justify-center">
      <div className="relative w-full p-6 rounded-lg">
        <div
          className="absolute inset-0 bg-no-repeat bg-center z-1"
          style={{
            backgroundImage: "url('/images/codelock_bg.png')",
          }}
        />

        <div className="flex justify-center flex-col items-center relative z-10">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-3xl font-bold text-yellow-400 tracking-wider font-mono">
              ENTER ESCAPE CODE
            </h2>
          </div>

          <div className="mb-6">
            <div className="grid grid-cols-4 gap-4">
              {(["A", "B", "C", "D"] as const).map((key) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="text-xl text-yellow-400 font-mono font-bold mb-2">
                    {key}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        [key]: String((+prev[key] + 1) % 10),
                      }))
                    }
                    className="w-12 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 rounded-md mb-2 cursor-pointer"
                  >
                    <ArrowUpIcon />
                  </button>

                  <div className="w-14 h-14 flex items-center justify-center text-2xl font-bold text-white bg-gray-800 border-2 border-yellow-500 rounded-full mb-2 shadow-lg">
                    {inputs[key]}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        [key]: String((+prev[key] + 9) % 10),
                      }))
                    }
                    className="w-12 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-600 text-gray-200 rounded-md cursor-pointer"
                  >
                    <ArrowDownIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <p className="bg-red-100 text-red-800 text-center p-3 mb-4 rounded">
              {error}
            </p>
          )}

          <Button
            onClick={handleSubmit}
            variant="primary-yellow"
            className="w-8/12"
          >
            <UnlockIcon />
            Unlock
          </Button>
        </div>
      </div>
    </section>
  );
}
