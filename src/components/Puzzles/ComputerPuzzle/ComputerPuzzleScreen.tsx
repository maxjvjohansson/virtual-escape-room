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
    <section className="flex items-center flex-col justify-center border-[#0161fc] border-2">
      <div className="bg-[#0161fc] text-white px-2 py-2 text-sm font-bold w-full">
        Log On to Windows
      </div>
      <div className="bg-gradient-to-r from-[#688ae4] via-[#9cb9f5] from-20% via-60% to-[#799be9] to-90% w-full p-5 flex items-center justify-center border-b-[#ef5b25] border-b-2">
        <p className="text-white flex flex-col">
          <span className="text-sm font-thin">Microsoft©</span>
          <span className="text-4xl/6 flex font-semibold">
            Windows
            <span className="text-xl/1 text-[#ef5b25] font-bold">xp</span>
          </span>
          <span className="font-thin">Professional x64 Edition</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center justify-center bg-[#ede9d8] w-full p-5 pb-5"
      >
        <div className="flex justify-between w-full flex-col gap-2">
          <div className="flex justify-between w-full items-center">
            <p>User name:</p>
            <p className="w-40 border-1 border-gray-400 pl-2 bg-white md:w-80">
              Michael Myers
            </p>
          </div>
          <div className="flex gap-2 w-full items-center justify-between">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-1 border-gray-400 pl-2 w-40 bg-white md:w-80"
            />
          </div>
        </div>
        <p className="text-center w-full text-xs text-gray-700">
          Password hint: <span className="italic">{riddle?.question}</span>
        </p>
        {error && <p className="text-xs">{error}</p>}
        <button
          type="submit"
          className="border-1 rounded-sm p-0.5 w-30 bg-white cursor-pointer hover:border-[#3f72b7] transition-all duration-150 hover:bg-gray-100"
        >
          OK
        </button>
      </form>
    </section>
  );
}
