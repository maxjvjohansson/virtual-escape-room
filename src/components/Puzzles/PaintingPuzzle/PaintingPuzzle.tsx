import {
  PuzzleSet,
  PuzzleSets,
  Piece,
  getRandomFakePieces,
} from "../../../data/paintingPuzzleData";
import { useState, useEffect } from "react";
import Image from "next/image";
import PaintingPuzzlePieces from "./PaintingPuzzlePieces";

type PaintingPuzzleProps = {
  onSolved?: () => void;
};

type Location = "painting" | "inventory";

const selectedPainting: PuzzleSet =
  PuzzleSets[Math.floor(Math.random() * PuzzleSets.length)];
const clue: Piece =
  selectedPainting.correct[
    Math.floor(Math.random() * selectedPainting.correct.length)
  ];

export default function PaintingPuzzle({ onSolved }: PaintingPuzzleProps) {
  const [painting, setPainting] = useState<(Piece | null)[]>(
    Array(12).fill(null)
  );
  const [inventory, setInventory] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [puzzleSet, setPuzzleSet] = useState<PuzzleSet | null>(null);
  const [cluePiece, setCluePiece] = useState<Piece | null>(null);

  function shuffle<T>(array: T[]): T[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

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

  function checkIfSolved(painting: (Piece | null)[]) {
    const isSolved: boolean | undefined = puzzleSet?.correct.every(
      (correctPiece) => {
        if (correctPiece.correctIndex === null) return false;
        const placedPiece: Piece | null = painting[correctPiece.correctIndex];
        return placedPiece?.id === correctPiece.id;
      }
    );

    if (isSolved && onSolved) {
      onSolved();
    }
  }

  function handlePlacePiece(indexOrPiece: number | Piece, from: Location) {
    if (typeof indexOrPiece === "number") {
      const index: number = indexOrPiece;

      if (index === cluePiece?.correctIndex) return;

      const piece: Piece | null = painting[index];

      if (selectedPiece) {
        movePiece(
          from,
          selectedPiece,
          index,
          painting.findIndex((p) => p?.id === selectedPiece.id)
        );
      } else if (piece?.id !== cluePiece?.id) {
        setSelectedPiece(piece);
      }
    } else {
      if (from === "inventory" && selectedPiece) {
        const fromIndex: number = painting.findIndex(
          (p) => p?.id === selectedPiece.id
        );

        if (fromIndex !== -1 && selectedPiece.id !== cluePiece?.id) {
          movePiece("inventory", selectedPiece, undefined, fromIndex);
        }
        setSelectedPiece(null);
      }
    }
  }

  function movePiece(
    to: Location,
    piece: Piece,
    targetIndex?: number,
    fromIndex?: number
  ) {
    if (piece.id === cluePiece?.id) return;

    if (to === "painting" && typeof targetIndex === "number") {
      setPainting((prevPainting) => {
        const newPainting: (Piece | null)[] = [...prevPainting];

        const existing: Piece | null = newPainting[targetIndex];

        if (
          existing &&
          existing.id !== piece.id &&
          existing.id !== cluePiece?.id
        ) {
          setInventory((prevInventory) => {
            return prevInventory.some((p) => p.id === existing.id)
              ? prevInventory
              : [...prevInventory, existing];
          });
        }

        if (typeof fromIndex === "number") {
          newPainting[fromIndex] = null;
        }

        newPainting[targetIndex] = piece;
        return newPainting;
      });
      setInventory((prevInventory) =>
        prevInventory.filter((p) => p.id !== piece.id)
      );
    }

    if (to === "inventory") {
      setPainting((prevPainting) => {
        const newPainting: (Piece | null)[] = [...prevPainting];

        if (
          typeof fromIndex === "number" &&
          newPainting[fromIndex]?.id === piece.id
        ) {
          newPainting[fromIndex] = null;
        }
        return newPainting;
      });

      setInventory((prevInventory) => {
        if (!prevInventory.some((p) => p.id === piece.id)) {
          return [...prevInventory, piece];
        }
        return prevInventory;
      });
    }
    setSelectedPiece(null);
  }

  useEffect(() => {
    checkIfSolved(painting);
  }, [painting]);

  return (
    <section className="flex flex-col items-center gap-4 p-2">
      <div className="grid grid-cols-3">
        {painting.map((piece, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = e.dataTransfer.getData("piece");
              const source = e.dataTransfer.getData("source");
              const fromIndex = parseInt(
                e.dataTransfer.getData("fromIndex"),
                10
              );
              if (!data) return;
              if (index === cluePiece?.correctIndex) return;
              const droppedPiece: Piece = JSON.parse(data);
              movePiece(
                "painting",
                droppedPiece,
                index,
                source === "painting" ? fromIndex : undefined
              );
            }}
            onClick={() => handlePlacePiece(index, "painting")}
            className="w-16 h-18 border-1 border-gray-400 items-center bg-gray-200 justify-center"
          >
            {piece ? (
              <Image
                src={piece.image}
                alt={`Piece ${piece.id}`}
                width={128}
                height={128}
                data-piece={piece.id}
                draggable={piece.id !== cluePiece?.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData("piece", JSON.stringify(piece));
                  e.dataTransfer.setData("source", "painting");
                  e.dataTransfer.setData("fromIndex", index.toString());
                }}
                className={`border-1 ${
                  selectedPiece?.id === piece.id
                    ? "border-red-400 border-2"
                    : "border-transparent"
                } object-cover`}
              />
            ) : null}
          </div>
        ))}
      </div>

      <PaintingPuzzlePieces
        pieces={inventory}
        onSelect={setSelectedPiece}
        selectedPiece={selectedPiece}
        onClick={(piece) => {
          handlePlacePiece(piece, "inventory");
        }}
        onDropToInventory={(piece: Piece, fromIndex?: number) => {
          movePiece("inventory", piece, undefined, fromIndex);
        }}
      ></PaintingPuzzlePieces>
    </section>
  );
}
