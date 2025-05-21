import { usePuzzle } from "@/hooks/usePuzzle";
import { usePaintingPuzzle, selectedPainting } from "@/hooks/usePaintingPuzzle";
import {
  handlePlacePiece,
  movePiece,
  checkIfSolved,
} from "@/utils/paintingPuzzleLogic";
import PaintingPuzzlePieces from "./PaintingPuzzlePieces";
import PaintingGrid from "./PaintingGrid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function PaintingPuzzle() {
  const { isSolved, solutionDigit, solve } = usePuzzle("painting", "D");
  const [focusMode, setFocusMode] = useState<"none" | "painting" | "inventory">(
    "none"
  );
  const {
    painting,
    setPainting,
    inventory,
    setInventory,
    selectedPiece,
    setSelectedPiece,
    puzzleSet,
    cluePiece,
  } = usePaintingPuzzle();

  const neutralFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (focusMode === "painting") {
      const square = document.querySelector(
        '[data-painting-index="0"]'
      ) as HTMLElement | null;
      square?.focus();
    } else if (focusMode === "inventory") {
      const piece = document.querySelector(
        '[data-inventory-index="0"]'
      ) as HTMLElement | null;
      piece?.focus();
    } else if (focusMode === "none") {
      neutralFocusRef?.current?.focus();
    }
  }, [focusMode]);

  useEffect(() => {
    if (puzzleSet) {
      checkIfSolved(painting, puzzleSet, solve);
    }
  }, [painting]);

  return (
    <section className="flex flex-col items-center gap-10 p-6 bg-[#191807]">
      {isSolved ? (
        <>
          <Image
            src={selectedPainting.fullImage}
            alt="Finished Painting"
            height={720}
            width={720}
            className="h-auto w-55 pt-8"
          />
          <Image
            src="/images/paintingPuzzlePaintings/painting-frame.png"
            alt="Frame"
            width={720}
            height={720}
            className="absolute z-20 h-auto w-68 top-4 pointer-events-none"
          />
          <div className="text-center w-full flex items-center flex-col justify-center p-5 h-50 bg-[url(/images/paintingPuzzlePaintings/painting-table.png)] bg-cover bg-no-repeat border-2 border-[#3F2915]">
            <p className="bg-green-100 text-green-800 p-3 mb-4 rounded w-full">
              Good job! The painting has been repaired!
            </p>
            <p className="text-xl mb-4 text-white">
              You&apos;ve discovered code digit:{" "}
              <span className="font-bold text-2xl">D{solutionDigit}</span>
            </p>
          </div>
        </>
      ) : (
        <>
          <section
            tabIndex={0}
            ref={neutralFocusRef}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" ||
                (e.key === " " && focusMode !== "painting")
              ) {
                e.preventDefault();
                setFocusMode("painting");
              } else if (e.key === "Escape") {
                setFocusMode("none");
              }
            }}
            className="focus:shadow-[0_0_50px_rgba(190,140,60,0.7)]"
          >
            <PaintingGrid
              painting={painting}
              cluePiece={cluePiece}
              selectedPiece={selectedPiece}
              focusMode={focusMode === "painting"}
              handleClick={(index) =>
                handlePlacePiece(
                  index,
                  "painting",
                  painting,
                  inventory,
                  cluePiece,
                  selectedPiece,
                  setPainting,
                  setInventory,
                  setSelectedPiece
                )
              }
              handleDrop={(piece, index, source, fromIndex) =>
                movePiece(
                  "painting",
                  piece,
                  cluePiece,
                  setPainting,
                  setInventory,
                  setSelectedPiece,
                  index,
                  source === "painting" ? fromIndex : undefined
                )
              }
            />
          </section>
          <Image
            src="/images/paintingPuzzlePaintings/painting-frame.png"
            alt="Frame"
            width={720}
            height={720}
            className="absolute z-20 h-auto w-66 top-3 pointer-events-none"
          />
          <section
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" ||
                (e.key === " " && focusMode !== "inventory")
              ) {
                e.preventDefault();
                setFocusMode("inventory");
              } else if (e.key === "Escape") {
                setFocusMode("none");
              }
            }}
            className="focus:shadow-[0_0_50px_rgba(190,140,60,0.7)] bg-[url(/images/paintingPuzzlePaintings/painting-table.png)] bg-no-repeat bg-cover"
          >
            <PaintingPuzzlePieces
              pieces={inventory}
              onSelect={(piece) => {
                setSelectedPiece(piece);
                setFocusMode("painting");
              }}
              selectedPiece={selectedPiece}
              focusMode={focusMode === "inventory"}
              onClick={(piece) =>
                handlePlacePiece(
                  piece,
                  "inventory",
                  painting,
                  inventory,
                  cluePiece,
                  selectedPiece,
                  setPainting,
                  setInventory,
                  setSelectedPiece
                )
              }
              onDropToInventory={(piece, fromIndex) =>
                movePiece(
                  "inventory",
                  piece,
                  cluePiece,
                  setPainting,
                  setInventory,
                  setSelectedPiece,
                  undefined,
                  fromIndex
                )
              }
            />
          </section>
        </>
      )}
    </section>
  );
}
