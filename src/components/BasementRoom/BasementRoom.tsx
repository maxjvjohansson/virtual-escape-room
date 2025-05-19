import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useGameContext } from "@/lib/context/GameContext";
import Image from "next/image";
import Button from "@/elements/Button";
import ComputerPuzzleModal from "../Puzzles/ComputerPuzzle/ComputerPuzzleModal";
import OddOutPuzzleModal from "../Puzzles/OddOutPuzzle/OddOutPuzzleModal";
import WordPuzzleModal from "../Puzzles/WordPuzzle/WordPuzzleModal";
import PaintingPuzzleModal from "../Puzzles/PaintingPuzzle/PaintingPuzzleModal";
import CodeLockModal from "../CodeLock/CodeLockModal";
import GameOverModal from "../GameOver/GameOverModal";
import Timer from "../Timer/Timer";
import Inventory from "../Inventory/Inventory";

export default function BasementRoom() {
  const { state } = useGameContext();
  const [showComputer, setShowComputer] = useState(false);
  const [showOddOut, setShowOddOut] = useState(false);
  const [showWordPuzzle, setShowWordPuzzle] = useState(false);
  const [showPainting, setShowPainting] = useState(false);
  const [showCodeLock, setShowCodeLock] = useState(false);

  const router = useRouter();

  useEffect(() => {
    console.log(state.code);
  }, [state.code]);

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/basement_empty.png')" }}
    >
      <Button onClick={() => setShowComputer(true)}>Computer Game</Button>
      <Button onClick={() => setShowOddOut(true)}>Odd One Out</Button>
      <Button onClick={() => setShowWordPuzzle(true)}>Word puzzle</Button>
      <Button onClick={() => setShowPainting(true)}>Painting Puzzle</Button>
      <div className="relative w-full max-w-[1920px] mx-auto">
        <Button onClick={() => setShowCodeLock(true)} className="border-none">
          <Image
            src="/images/lock.png"
            alt="Code Lock"
            width={100}
            height={100}
          />
        </Button>
      </div>
      <ComputerPuzzleModal
        isOpen={showComputer}
        onClose={() => setShowComputer(false)}
      />
      <OddOutPuzzleModal
        isOpen={showOddOut}
        onClose={() => setShowOddOut(false)}
      />
      <WordPuzzleModal
        isOpen={showWordPuzzle}
        onClose={() => setShowWordPuzzle(false)}
      />
      <PaintingPuzzleModal
        isOpen={showPainting}
        onClose={() => setShowPainting(false)}
      ></PaintingPuzzleModal>
      <CodeLockModal
        isOpen={showCodeLock}
        onClose={() => setShowCodeLock(false)}
      ></CodeLockModal>
      <Inventory />
      <Timer
        startedAt={state.startedAt}
        finishedAt={state.finishedAt}
        durationMs={60 * 60 * 1000}
      />
      <GameOverModal
        isOpen={state.isGameOver}
        onClose={() => router.push("/")}
      />
    </section>
  );
}