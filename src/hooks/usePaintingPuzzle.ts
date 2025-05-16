import {
  PuzzleSet,
  PuzzleSets,
  Piece,
  getRandomFakePieces,
} from "@/data/paintingPuzzleData";
import { useState, useEffect } from "react";

function shuffle<T>(array: T[]): T[] {
  return [...array]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export const selectedPainting: PuzzleSet =
  PuzzleSets[Math.floor(Math.random() * PuzzleSets.length)];
const clue: Piece =
  selectedPainting.correct[
    Math.floor(Math.random() * selectedPainting.correct.length)
  ];

export function usePaintingPuzzle() {
  const [painting, setPainting] = useState<(Piece | null)[]>(
    Array(12).fill(null)
  );
  const [inventory, setInventory] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [puzzleSet, setPuzzleSet] = useState<PuzzleSet | null>(null);
  const [cluePiece, setCluePiece] = useState<Piece | null>(null);

  useEffect(() => {
    const newPainting: Array<Piece> = Array(
      selectedPainting.correct.length
    ).fill(null);
    newPainting[clue.correctIndex!] = clue;

    const randomFakePieces: Piece[] = getRandomFakePieces(
      PuzzleSets,
      selectedPainting.name,
      2
    );

    const remaining: Piece[] = selectedPainting.correct.filter(
      (piece) => piece.id !== clue.id
    );
    const mixedInventory: Piece[] = shuffle([
      ...remaining,
      ...randomFakePieces,
    ]);

    setPuzzleSet(selectedPainting);
    setCluePiece(clue);
    setPainting(newPainting);
    setInventory(mixedInventory);
  }, []);

  return {
    painting,
    setPainting,
    inventory,
    setInventory,
    selectedPiece,
    setSelectedPiece,
    puzzleSet,
    cluePiece,
  };
}
