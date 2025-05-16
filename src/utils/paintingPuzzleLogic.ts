import { Piece, PuzzleSet } from "@/data/paintingPuzzleData";
import { Dispatch, SetStateAction } from "react";

export function checkIfSolved(
  painting: (Piece | null)[],
  puzzleSet: PuzzleSet,
  solve: () => void
) {
  const isCorrect = puzzleSet.correct.every((correctPiece) => {
    if (correctPiece.correctIndex == null) return false;
    return painting[correctPiece.correctIndex]?.id === correctPiece.id;
  });

  if (isCorrect) solve();
}

export function movePiece(
  to: "painting" | "inventory",
  piece: Piece,
  cluePiece: Piece | null,
  setPainting: Dispatch<SetStateAction<(Piece | null)[]>>,
  setInventory: Dispatch<SetStateAction<Piece[]>>,
  setSelectedPiece: Dispatch<SetStateAction<Piece | null>>,
  targetIndex?: number,
  fromIndex?: number
) {
  if (piece.id === cluePiece?.id) return;

  if (to === "painting" && targetIndex === cluePiece?.correctIndex) return;

  if (to === "painting" && typeof targetIndex === "number") {
    setPainting((prev) => {
      const next = [...prev];
      const existing = next[targetIndex];

      if (
        existing &&
        existing.id !== piece.id &&
        existing.id !== cluePiece?.id
      ) {
        setInventory((prevInv) =>
          prevInv.some((p) => p.id === existing.id)
            ? prevInv
            : [...prevInv, existing]
        );
      }

      if (typeof fromIndex === "number") {
        next[fromIndex] = null;
      }

      next[targetIndex] = piece;
      return next;
    });

    setInventory((prevInv) => prevInv.filter((p) => p.id !== piece.id));
  }

  if (to === "inventory") {
    setPainting((prev) => {
      const next = [...prev];
      if (typeof fromIndex === "number" && next[fromIndex]?.id === piece.id) {
        next[fromIndex] = null;
      }
      return next;
    });

    setInventory((prevInv) =>
      prevInv.some((p) => p.id === piece.id) ? prevInv : [...prevInv, piece]
    );
  }

  setSelectedPiece(null);
}

export function handlePlacePiece(
  indexOrPiece: number | Piece,
  from: "painting" | "inventory",
  painting: (Piece | null)[],
  inventory: Piece[],
  cluePiece: Piece | null,
  selectedPiece: Piece | null,
  setPainting: Dispatch<SetStateAction<(Piece | null)[]>>,
  setInventory: Dispatch<SetStateAction<Piece[]>>,
  setSelectedPiece: Dispatch<SetStateAction<Piece | null>>
) {
  if (typeof indexOrPiece === "number") {
    const index = indexOrPiece;

    if (index === cluePiece?.correctIndex) return;

    const piece = painting[index];

    if (selectedPiece) {
      movePiece(
        "painting",
        selectedPiece,
        cluePiece,
        setPainting,
        setInventory,
        setSelectedPiece,
        index,
        painting.findIndex((p) => p?.id === selectedPiece.id)
      );
    } else if (piece?.id !== cluePiece?.id) {
      setSelectedPiece(piece);
    }
  } else {
    if (from === "inventory" && selectedPiece) {
      const fromIndex = painting.findIndex((p) => p?.id === selectedPiece.id);

      if (fromIndex !== -1 && selectedPiece.id !== cluePiece?.id) {
        movePiece(
          "inventory",
          selectedPiece,
          cluePiece,
          setPainting,
          setInventory,
          setSelectedPiece,
          undefined,
          fromIndex
        );
      }

      setSelectedPiece(null);
    }
  }
}
