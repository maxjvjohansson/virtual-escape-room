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
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/basement_empty.png')" }}
    >
      <div className="absolute top-8">
        <Timer
          startedAt={state.startedAt}
          finishedAt={state.finishedAt}
          durationMs={60 * 60 * 1000}
        />
      </div>
      <div className="absolute w-[16%] top-[40%] left-[32%] hover-shake">
        <Button onClick={() => setShowComputer(true)}>
          <Image
            src={"/images/computer.png"}
            width={720}
            height={720}
            alt="A old Computer"
          ></Image>
        </Button>
      </div>
      <div className="absolute w-[13%] top-[58%] left-[60.5%] hover-shake">
        <Button onClick={() => setShowOddOut(true)}>
          <Image
            src={"/images/cards.png"}
            width={720}
            height={720}
            alt="A stack of cards"
          ></Image>
        </Button>
      </div>
      <div className="absolute w-[6.5%] top-[2%] right-[9.5%] hover-shake">
        <Button onClick={() => setShowWordPuzzle(true)}>
          <Image
            src={"/images/book.png"}
            width={720}
            height={720}
            alt="An old book"
          ></Image>
        </Button>
      </div>
      <div className="absolute w-[15%] top-[5%] left-[44%] hover-shake">
        <Button onClick={() => setShowPainting(true)}>
          <Image
            src={"/images/painting_rectangular.png"}
            width={720}
            height={720}
            alt="stack of cards"
          ></Image>
        </Button>
      </div>
      <div className="absolute top-[49%] left-[21%] w-[7%] hover-shake">
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
      <div className="absolute w-full h-auto bottom-8">
        <Inventory />
      </div>
      <GameOverModal
        isOpen={state.isGameOver}
        onClose={() => router.push("/")}
      />
    </section>
  );
}
