import Button from "@/elements/Button";
import { useState } from "react";
import ComputerPuzzleModal from "../Puzzles/ComputerPuzzle/ComputerPuzzleModal";
import OddOutPuzzleModal from "../Puzzles/OddOutPuzzle/OddOutPuzzleModal";
import PaintingPuzzleModal from "../Puzzles/PaintingPuzzle/PaintingPuzzleModal";

export default function BasementRoom() {
  const [showComputer, setShowComputer] = useState(false);
  const [showOddOut, setShowOddOut] = useState(false);
  const [showPainting, setShowPainting] = useState(false);

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/haunted_basement.png')" }}
    >
      <Button onClick={() => setShowComputer(true)}>Computer Game</Button>
      <Button onClick={() => setShowOddOut(true)}>Odd One Out</Button>
      <Button onClick={() => setShowPainting(true)}>Painting Puzzle</Button>
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
    </section>
  );
}
