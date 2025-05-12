import Button from "@/elements/Button";
import { useState, useEffect } from "react";
import ComputerPuzzleModal from "../Puzzles/ComputerPuzzle/ComputerPuzzleModal";
import OddOutPuzzleModal from "../Puzzles/OddOutPuzzle/OddOutPuzzleModal";
import PaintingPuzzleModal from "../Puzzles/PaintingPuzzle/PaintingPuzzleModal";
import { useGameContext } from "@/lib/context/GameContext";
import CodeLockModal from "../CodeLock/CodeLockModal";

export default function BasementRoom() {
  const { state } = useGameContext();
  const [showComputer, setShowComputer] = useState(false);
  const [showOddOut, setShowOddOut] = useState(false);
  const [showPainting, setShowPainting] = useState(false);
  const [showCodeLock, setShowCodeLock] = useState(false);

  useEffect(() => {
    console.log(state.code);
  }, [state.code]);

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/haunted_basement.png')" }}
    >
      <Button onClick={() => setShowComputer(true)}>Computer Game</Button>
      <Button onClick={() => setShowOddOut(true)}>Odd One Out</Button>
      <Button onClick={() => setShowPainting(true)}>Painting Puzzle</Button>
      <Button onClick={() => setShowCodeLock(true)}>Code Lock</Button>
      <ComputerPuzzleModal
        isOpen={showComputer}
        onClose={() => setShowComputer(false)}
      />
      <OddOutPuzzleModal
        isOpen={showOddOut}
        onClose={() => setShowOddOut(false)}
      />
      <PaintingPuzzleModal
        isOpen={showPainting}
        onClose={() => setShowPainting(false)}
      ></PaintingPuzzleModal>
      <CodeLockModal
        isOpen={showCodeLock}
        onClose={() => setShowCodeLock(false)}
      ></CodeLockModal>
    </section>
  );
}
