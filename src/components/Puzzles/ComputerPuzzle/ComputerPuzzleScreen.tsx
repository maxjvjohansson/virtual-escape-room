import React, { useState } from "react";
import { Riddle } from "./ComputerPuzzleRiddle";
import { usePuzzle } from "@/hooks/usePuzzle";
import Image from "next/image";

type ComputerPuzzleScreenProps = {
  riddle: Riddle;
};

export default function ComputerPuzzleScreen({
  riddle,
}: ComputerPuzzleScreenProps) {
  const { isSolved, solutionDigit, solve } = usePuzzle("computer", "A");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hasReqHint, setHasReqHint] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.toLowerCase().trim() === riddle.answer.toLowerCase()) {
      solve();
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <section className="bg-[#004f99] bg-[url(/images/old-computer.png)] bg-cover bg-no-repeat bg-center flex items-center justify-center h-[90vh] max-h-180 md:w-5xl">
      <div className="flex items-center flex-col justify-center border-[#0a22ae] border-2 rounded-lg md:w-xl">
        <div className="bg-[#004ce8] text-white px-2 py-2 text-sm font-bold w-full rounded-t-lg">
          Log On to Windows
        </div>
        <div className="bg-gradient-to-r from-[#688ae4] via-[#9cb9f5] from-20% via-60% to-[#799be9] to-90% w-full p-5 flex items-center justify-center border-b-[#ef5b25] border-b-2">
          <Image
            src={"/images/windows-logo.png"}
            height={720}
            width={720}
            alt="windows logo"
            className="h-20 w-20"
          ></Image>
          <p className="text-white flex flex-col">
            <span className="text-sm font-thin">Microsoft©</span>
            <span className="text-4xl/6 flex font-semibold">
              Windows
              <span className="text-xl/1 text-[#ef5b25] font-bold">xp</span>
            </span>
            <span className="font-thin text-xl/6">
              Professional x64 Edition
            </span>
          </p>
        </div>

        {!isSolved ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center justify-center bg-[#ede9d8] w-full p-5 pb-5 rounded-b-lg"
          >
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full items-center gap-5">
                <p className="w-23">User name:</p>
                <p className="w-[65%] border-1 border-gray-400 pl-2 bg-white">
                  Michael Myers
                </p>
              </div>
              <div className="flex w-full items-center gap-5">
                <label htmlFor="password" className="w-23">
                  Password:
                </label>
                <input
                  id="password"
                  type="text"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-1 border-gray-400 pl-2 w-[65%] bg-white"
                />
              </div>
            </div>
            <p className="text-center w-full text-xs text-gray-700 pl-5 pr-5">
              Password riddle:{" "}
              <span className="italic">{riddle?.question}</span>
            </p>
            {hasReqHint && (
              <p className="text-center w-full text-xs text-gray-700 pl-10 pr-10">
                Password hint: <span className="italic">{riddle?.hint}</span>
              </p>
            )}
            {error && (
              <p className="text-xs bg-red-200 text-red-800 p-2 rounded">
                {error}
              </p>
            )}
            <div className="flex gap-2 self-end w-full justify-end">
              <button
                type="submit"
                className="border-1 rounded-sm w-[25%] bg-white cursor-pointer hover:border-[#3f72b7] transition-all duration-150 hover:bg-gray-100 md:w-[17%] text-sm p-0.5"
              >
                OK
              </button>
              <button
                type="button"
                className="border-1 border-gray-400 rounded-sm w-[25%] bg-white cursor-not-allowed transition-all duration-150 disabled:opacity-50 md:w-[17%] text-sm"
                disabled
              >
                Cancel
              </button>
              <button
                type="button"
                className="border-1 rounded-sm w-[25%] bg-white cursor-pointer hover:border-[#3f72b7] transition-all duration-150 hover:bg-gray-100 md:w-[17%] text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasReqHint === false) {
                    setHasReqHint(true);
                  } else {
                    setHasReqHint(false);
                  }
                }}
              >
                {!hasReqHint ? "Hint" : "Hide hint"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center bg-[#ede9d8] w-full flex items-center flex-col justify-center p-5">
            <p className="bg-green-100 text-green-800 p-3 mb-4 rounded w-50">
              You&apos;re Logged in!
            </p>
            <p className="text-xl mb-4">
              You&apos;ve discovered code digit:{" "}
              <span className="font-bold text-2xl">A{solutionDigit}</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
