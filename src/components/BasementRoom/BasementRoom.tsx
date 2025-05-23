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
    <section className="w-screen h-screen overflow-auto touch-pan-x touch-pan-y">
      <div className="absolute top-8 z-10 left-17 md:left-[43.5%]">
        <Timer
          startedAt={state.startedAt}
          finishedAt={state.finishedAt}
          durationMs={60 * 60 * 1000}
        />
      </div>
      <div
        className="relative w-[300vw] h-[100vh] bg-cover bg-center bg-no-repeat md:w-screen md:h-screen"
        style={{ backgroundImage: "url('/images/basement_empty.png')" }}
      >
        <div className="absolute w-[20%] top-[40%] left-[30%] md:w-[16%] md:top-[40%] md:left-[32%] hover-shake">
          <Button onClick={() => setShowComputer(true)}>
            <Image
              src={"/images/computer.png"}
              width={720}
              height={720}
              alt="A old Computer"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[15%] top-[55%] left-[61%] md:w-[13%] md:top-[58%] md:left-[60.5%] hover-shake">
          <Button onClick={() => setShowOddOut(true)}>
            <Image
              src={"/images/cards.png"}
              width={720}
              height={720}
              alt="A stack of cards"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[9%] top-[13%] right-[5%] md:w-[7%] md:top-[1%] md:right-[9.5%] hover-shake">
          <Button onClick={() => setShowWordPuzzle(true)}>
            <Image
              src={"/images/book.png"}
              width={720}
              height={720}
              alt="An old book"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[17%] top-[17%] left-[43%] md:w-[15%] md:top-[5%] md:left-[44%] hover-shake">
          <Button onClick={() => setShowPainting(true)}>
            <Image
              src={"/images/painting_rectangular.png"}
              width={720}
              height={720}
              alt="stack of cards"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[9%] top-[48%] left-[17.5%] md:top-[49%] md:left-[21%] md:w-[7%] hover-shake">
          <Button onClick={() => setShowCodeLock(true)} className="border-none">
            <Image
              src="/images/lock.png"
              alt="Code Lock"
              width={100}
              height={100}
            />
          </Button>
        </div>
        <div className="absolute w-[13%] top-[24%] right-[1%] md:w-[10%] md:top-[18%] md:right-[6%] hover-shake">
          <Button className="fake-item">
            <Image
              src={"/images/statue.png"}
              width={720}
              height={720}
              alt="A stone statue"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[9%] bottom-[25%] right-[3.5%] md:w-[7%] md:bottom-[18%] md:right-[7.5%] hover-shake">
          <Button className="fake-item">
            <Image
              src={"/images/candle.png"}
              width={720}
              height={720}
              alt="A big candle"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[19%] top-[11%] right-[19%] md:w-[14%] md:top-[1%] md:right-[23%] hover-shake">
          <Button className="fake-item">
            <Image
              src={"/images/painting_circle.png"}
              width={720}
              height={720}
              alt="A stone statue"
            ></Image>
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
        <GameOverModal
          isOpen={state.isGameOver}
          onClose={() => router.push("/")}
        />
      </div>
      <div className="absolute w-full h-auto bottom-8">
        <Inventory />
      </div>
    </section>
  );
}
