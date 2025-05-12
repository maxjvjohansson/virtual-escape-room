import {
  MyersCorrectPieces,
  MyersFakePieces,
  Piece,
} from "./paintingPuzzleData";
import { useState, useEffect } from "react";
import Image from "next/image";
import PaintingPuzzlePieces from "./PaintingPuzzlePieces";
import { CluePiece } from "./paintingPuzzleData";

type PaintingPuzzleProps = {
  onSolved?: () => void;
};

export default function PaintingPuzzle({ onSolved }: PaintingPuzzleProps) {
  const [painting, setPainting] = useState<(Piece | null)[]>(
    Array(6).fill(null)
  );
  const [inventory, setInventory] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  function shuffle<T>(array: T[]): T[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  useEffect(() => {
    const newPainting = Array(6).fill(null);
    newPainting[CluePiece.correctIndex!] = CluePiece;

    const remaining = MyersCorrectPieces.filter(
      (piece) => piece.id !== CluePiece.id
    );
    const mixedInventory = shuffle([...remaining, ...MyersFakePieces]);

    setPainting(newPainting);
    setInventory(mixedInventory);
  }, []);

  function handlePlacePiece(index: number) {
    if (!selectedPiece) {
      return;
    }
    handleDrop(index, selectedPiece);
    setSelectedPiece(null);
  }

  function checkIfSolved(painting: (Piece | null)[]) {
    const isSolved = MyersCorrectPieces.every((correctPiece) => {
      if (correctPiece.correctIndex === null) return false;
      const placedPiece = painting[correctPiece.correctIndex];
      return placedPiece?.id === correctPiece.id;
    });

    if (isSolved && onSolved) {
      onSolved();
    }
  }

  function handleDrop(
    index: number,
    piece: Piece,
    fromIndex?: number,
    from?: string
  ) {
    if (painting[index]?.id === CluePiece.id) {
      return;
    }

    setPainting((prevPainting) => {
      const newPainting = [...prevPainting];

      const currentPiece = newPainting[index];

      if (currentPiece && currentPiece.id !== piece.id) {
        setInventory((prevInventory) => {
          if (!prevInventory.some((p) => p.id === currentPiece.id)) {
            return [...prevInventory, currentPiece];
          }
          return prevInventory;
        });
      }

      if (from === "painting" && typeof fromIndex === "number") {
        newPainting[fromIndex] = null;
      }

      newPainting[index] = piece;

      return newPainting;
    });

    if (from !== "painting") {
      setInventory((prevPainting) =>
        prevPainting.filter((p) => p.id !== piece.id)
      );
    }
  }

  useEffect(() => {
    checkIfSolved(painting);
  }, [painting]);

  return (
    <section className="flex flex-col items-center gap-8 p-4">
      <div className="grid grid-cols-2">
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
              const droppedPiece: Piece = JSON.parse(data);
              handleDrop(index, droppedPiece, fromIndex, source);
            }}
            onClick={() => handlePlacePiece(index)}
            className="w-32 h-32 border-1 border-dashed border-gray-400 items-center bg-gray-200"
          >
            {piece ? (
              <Image
                src={piece.image}
                alt={`Piece ${piece.id}`}
                width={128}
                height={128}
                data-piece={piece.id}
                draggable={piece.id !== CluePiece.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData("piece", JSON.stringify(piece));
                  e.dataTransfer.setData("source", "painting");
                  e.dataTransfer.setData("fromIndex", index.toString());
                }}
                className="object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>

      <PaintingPuzzlePieces
        pieces={inventory}
        onSelect={(piece) => setSelectedPiece(piece)}
        selectedPiece={selectedPiece}
      ></PaintingPuzzlePieces>
    </section>
  );
}
