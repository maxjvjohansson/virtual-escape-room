import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
import clsx from "clsx";

export default function BasementRoom() {
  const { state } = useGameContext();
  const [showComputer, setShowComputer] = useState(false);
  const [showOddOut, setShowOddOut] = useState(false);
  const [showWordPuzzle, setShowWordPuzzle] = useState(false);
  const [showPainting, setShowPainting] = useState(false);
  const [showCodeLock, setShowCodeLock] = useState(false);

  const [showFakePopup, setShowFakePopup] = useState(false);
  const [fakePopupFade, setFakePopupFade] = useState(false);

  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [showCodeHint, setShowCodeHint] = useState(false);
  const [codeHintFade, setCodeHintFade] = useState(false);

  const fakeFadeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fakeHideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const allPuzzlesSolved = Object.values(state.puzzles).every(Boolean);

  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowSwipeHint(true);
      setIsFadingOut(false);

      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000);

      const hideTimer = setTimeout(() => {
        setShowSwipeHint(false);
        setIsFadingOut(false);
      }, 3000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  function fakeItemPressed() {
    if (fakeFadeTimerRef.current) clearTimeout(fakeFadeTimerRef.current);
    if (fakeHideTimerRef.current) clearTimeout(fakeHideTimerRef.current);

    setShowFakePopup(true);
    setFakePopupFade(false);

    fakeFadeTimerRef.current = setTimeout(() => {
      setFakePopupFade(true);
    }, 1000);

    fakeHideTimerRef.current = setTimeout(() => {
      setFakePopupFade(false);
      setShowFakePopup(false);
    }, 2000);
  }

  function showCodeHintPopup() {
    setShowCodeHint(true);
    setCodeHintFade(false);

    setTimeout(() => setCodeHintFade(true), 1500);
    setTimeout(() => {
      setShowCodeHint(false);
      setCodeHintFade(false);
    }, 3000);
  }

  useEffect(() => {
    if (fakeFadeTimerRef.current) clearTimeout(fakeFadeTimerRef.current);
    if (fakeHideTimerRef.current) clearTimeout(fakeHideTimerRef.current);
  }, []);

  return (
    <section className="w-screen h-screen overflow-auto touch-pan-x touch-pan-y">
      {showFakePopup && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-opacity-10 p-4 transition-opacity duration-750 ease-in-out ${
            fakePopupFade ? "opacity-0" : "opacity-100"
          } pointer-events-none`}
        >
          <div className="rounded-lg p-10 max-w-lg text-center shadow-lg opacity-100 flex flex-col justify-center items-center gap-2 bg-[url(/images/inventory.png)] bg-contain bg-no-repeat bg-center">
            <p className="text-lg text-orange-300 z-1">
              This item holds no puzzle. Search elsewhere.
            </p>
          </div>
        </div>
      )}
      {showSwipeHint && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-opacity-10 p-4 transition-opacity duration-1000 ease-in-out ${
            isFadingOut ? "opacity-0" : "opacity-100"
          } pointer-events-none`}
        >
          <div className="bg-[#F9EFE5] rounded-lg p-4 max-w-xs text-center shadow-lg opacity-60 flex flex-col justify-center items-center gap-2">
            <Image
              src={"/images/swipe-icon.png"}
              height={720}
              width={720}
              alt="Swipe icon"
              className="w-[25%] self-center"
            ></Image>
            <p className="text-lg text-black">
              Swipe left and right to find objects to interact with.
            </p>
          </div>
        </div>
      )}
      {showCodeHint && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-opacity-10 p-4 transition-opacity duration-750 ease-in-out ${
            codeHintFade ? "opacity-0" : "opacity-100"
          } pointer-events-none`}
        >
          <div className="rounded-lg p-10 max-w-lg text-center shadow-lg opacity-100 flex flex-col justify-center items-center gap-2 bg-[url(/images/inventory.png)] bg-contain bg-no-repeat bg-center">
            <p className="text-lg text-orange-300 z-1">
              You must solve all puzzles to access the code lock.
            </p>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center pointer-events-none">
        <div className="absolute z-10 pt-5">
          <Timer
            startedAt={state.startedAt}
            finishedAt={state.finishedAt}
            durationMs={60 * 60 * 1000}
          />
        </div>
      </div>
      <div
        className="relative w-[300vw] h-[100vh] bg-cover bg-center bg-no-repeat lg:w-screen lg:h-screen"
        style={{ backgroundImage: "url('/images/basement_empty.png')" }}
      >
        <div className="absolute w-[20%] top-[38%] left-[29%] md:w-[16%] md:top-[38%] md:left-[32%] lg:w-[18%] lg:top-[41%] lg:left-[31%] xl:w-[16%] xl:top-[40%] xl:left-[32%] hover-shake">
          <Button onClick={() => setShowComputer(true)}>
            <Image
              src={"/images/computer.png"}
              width={720}
              height={720}
              alt="A old Computer"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[15%] top-[55%] left-[59%] md:w-[13%] md:top-[58%] md:left-[60.5%] lg:w-[16%] lg:top-[55%] lg:left-[59%] xl:w-[13%] xl:top-[58%] xl:left-[60.5%] hover-shake">
          <Button onClick={() => setShowOddOut(true)}>
            <Image
              src={"/images/cards.png"}
              width={720}
              height={720}
              alt="A stack of cards"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[8%] top-[11%] right-[8%] md:w-[6.5%] md:top-[-4%] md:right-[9.5%] lg:w-[9%] lg:top-[8%] lg:right-[8%] xl:w-[6.5%] xl:top-[2%] xl:right-[9.5%] hover-shake">
          <Button onClick={() => setShowWordPuzzle(true)}>
            <Image
              src={"/images/book.png"}
              width={720}
              height={720}
              alt="An old book"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[17%] top-[15%] left-[43%] md:w-[15%] md:top-[2%] md:left-[44%] lg:w-[17%] lg:top-[13%] lg:left-[43%] xl:w-[15%] xl:top-[5%] xl:left-[44%] hover-shake">
          <Button onClick={() => setShowPainting(true)}>
            <Image
              src={"/images/painting_rectangular.png"}
              width={720}
              height={720}
              alt="stack of cards"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[9%] top-[48%] left-[20%] md:top-[49%] md:left-[21%] md:w-[7%] lg:top-[47%] lg:left-[20%] lg:w-[9%] xl:top-[49%] xl:left-[21%] xl:w-[7%] hover-shake">
          <Button
            onClick={() => {
              if (allPuzzlesSolved) {
                setShowCodeLock(true);
              } else {
                showCodeHintPopup();
              }
            }}
            className={clsx(
              "border-none transition-opacity",
              allPuzzlesSolved ? "" : "opacity-30 cursor-pointer"
            )}
          >
            <Image
              src="/images/lock.png"
              alt="Code Lock"
              width={100}
              height={100}
            />
          </Button>
        </div>
        <div className="absolute w-[12%] top-[23%] right-[5%] md:w-[10%] md:top-[13%] md:right-[6%] lg:w-[13%] lg:top-[20%] lg:right-[5%] xl:w-[10%] xl:top-[18%] xl:right-[6%] hover-shake">
          <Button className="fake-item" onClick={fakeItemPressed}>
            <Image
              src={"/images/statue.png"}
              width={720}
              height={720}
              alt="A stone statue"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[9%] bottom-[24%] right-[7%] md:w-[7%] md:bottom-[15%] md:right-[7.5%] lg:w-[10%] lg:bottom-[21%] lg:right-[6%] xl:w-[7%] xl:bottom-[18%] xl:right-[7.5%] hover-shake">
          <Button className="fake-item" onClick={fakeItemPressed}>
            <Image
              src={"/images/candle.png"}
              width={720}
              height={720}
              alt="A big candle"
            ></Image>
          </Button>
        </div>
        <div className="absolute w-[19%] top-[9%] right-[20%] md:w-[16%] md:top-[-5%] md:right-[22%] lg:w-[18%] lg:top-[6%] lg:right-[21%] xl:w-[14%] xl:top-[1%] xl:right-[23%] hover-shake">
          <Button className="fake-item" onClick={fakeItemPressed}>
            <Image
              src={"/images/painting_circle.png"}
              width={720}
              height={720}
              alt="A circular painting"
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
