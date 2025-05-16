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
import { useEffect, useState } from "react";

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

  console.log(focusMode);

  useEffect(() => {
    if (puzzleSet) {
      checkIfSolved(painting, puzzleSet, solve);
    }
  }, [painting]);

  return (
    <section className="flex flex-col items-center gap-10 p-2">
      {isSolved ? (
        <>
          <Image
            src={selectedPainting.fullImage}
            alt="Finished Painting"
            height={720}
            width={720}
            className="h-auto w-55"
          />
          <Image
            src="/paintingPuzzlePaintings/painting-frame.png"
            alt="Frame"
            width={720}
            height={720}
            className="absolute z-20 h-auto w-69 top-0 pointer-events-none"
          />
          <p>D{solutionDigit}</p>
        </>
      ) : (
        <>
          <section
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFocusMode("painting");
              }
            }}
            className="focus:shadow-[0_0_50px_rgba(255,215,0.6)]"
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
            src="/paintingPuzzlePaintings/painting-frame.png"
            alt="Frame"
            width={720}
            height={720}
            className="absolute z-20 h-auto w-69 top-0 pointer-events-none"
          />
          <section
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFocusMode("inventory");
              }
            }}
            className="focus:shadow-[0_0_50px_rgba(255,215,0.6)]"
          >
            <PaintingPuzzlePieces
              pieces={inventory}
              onSelect={(piece) => {
                setSelectedPiece(piece);
                setTimeout(() => {
                  setFocusMode("painting");
                  const nextEl = document.querySelector(
                    '[data-painting-index="0"]'
                  ) as HTMLElement | null;
                  nextEl?.focus();
                }, 0);
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
