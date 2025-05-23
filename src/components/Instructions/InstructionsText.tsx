import PuzzleIcon from "@assets/icons/puzzle_yellow.svg";
import TrophyIcon from "@assets/icons/trophy_yellow.svg";
import LockOpenIcon from "@assets/icons/lock_open_purple.svg";
import ClockIcon from "@assets/icons/clock_purple.svg";
import SkullIcon from "@assets/icons/skull_purple.svg";

export default function InstructionsText() {
  return (
    <article
      className="w-sm md:w-xl mx-auto p-6 md:p-8 border-2 border-purple-500/20 shadow-2xl text-white"
      style={{
        background:
          "linear-gradient(90deg, #111827 0%, #24243B 50%, #18181E 100%)",
      }}
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <img
          src="/images/ghost_white.svg"
          alt="Ghost Icon"
          className="w-6 h-auto"
        />
        <h2 className="text-3xl font-bold tracking-wide">Game Rules</h2>
      </div>

      <ul className="space-y-4 text-sm leading-relaxed">
        <li className="flex gap-3 items-start">
          <div className="mt-1 flex-shrink-0">
            <LockOpenIcon className="w-5 h-5" />
          </div>
          <p>
            <span className="font-bold text-white">Objective:</span> Escape the
            haunted basement by solving 4 puzzles to uncover a 4-digit code that
            unlocks the final door.
          </p>
        </li>

        <li className="flex gap-3 items-start">
          <div className="mt-1 flex-shrink-0">
            <ClockIcon className="w-5 h-5" />
          </div>
          <p>
            <span className="font-bold text-white">Time Limit:</span> You have
            60 minutes. Solve all puzzles and escape before time runs out!
          </p>
        </li>

        <li className="flex gap-3 items-start">
          <div className="mt-1 flex-shrink-0">
            <PuzzleIcon className="w-5 h-5" />
          </div>
          <p>
            <span className="font-bold text-white">Puzzles:</span> Click objects
            in the room to access riddles, logic challenges, and clues. Each
            puzzle reveals a part of the escape code (e.g., A3).
          </p>
        </li>

        <li className="flex gap-3 items-start">
          <div className="mt-1 flex-shrink-0">
            <SkullIcon className="w-5 h-5" />
          </div>
          <p>
            <span className="font-bold text-white">Beware:</span> Some elements
            are there just to spook you... or distract you.
          </p>
        </li>

        <li className="flex gap-3 items-start">
          <div className="mt-1 flex-shrink-0">
            <TrophyIcon className="w-5 h-5" />
          </div>
          <div>
            <p>
              <span className="font-bold text-white">Winning:</span> The faster
              you escape, the better your score. The top players will be
              featured on the leaderboard!
            </p>
            <p className="mt-1">
              Winners will be honored with the exclusive{" "}
              <span className="text-yellow-300">Gold Raven </span>stamp – the
              mark of true puzzle masters.
            </p>
          </div>
        </li>
      </ul>
    </article>
  );
}
