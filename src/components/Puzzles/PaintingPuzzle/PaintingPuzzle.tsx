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

type Location = "painting" | "inventory";

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

  function handlePlacePiece(indexOrPiece: number | Piece, from: Location) {
    if (typeof indexOrPiece === "number") {
      const index = indexOrPiece;

      if (index === CluePiece.correctIndex) return;

      const piece = painting[index];

      if (selectedPiece) {
        movePiece(
          from,
          selectedPiece,
          index,
          painting.findIndex((p) => p?.id === selectedPiece.id)
        );
      } else if (piece?.id !== CluePiece.id) {
        setSelectedPiece(piece);
      }
    } else {
      const piece = indexOrPiece;

      if (from === "inventory" && selectedPiece) {
        const fromIndex = painting.findIndex((p) => p?.id === selectedPiece.id);

        if (fromIndex !== -1 && selectedPiece.id !== CluePiece.id) {
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
    if (piece.id === CluePiece.id) return;

    if (to === "painting" && typeof targetIndex === "number") {
      setPainting((prevPainting) => {
        const newPainting = [...prevPainting];

        const existing = newPainting[targetIndex];

        if (
          existing &&
          existing.id !== piece.id &&
          existing.id !== CluePiece.id
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
        const newPainting = [...prevPainting];

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
              if (index === CluePiece.correctIndex) return;
              const droppedPiece: Piece = JSON.parse(data);
              movePiece(
                "painting",
                droppedPiece,
                index,
                source === "painting" ? fromIndex : undefined
              );
            }}
            onClick={() => handlePlacePiece(index, "painting")}
            className="w-32 h-32 border-1 border-gray-400 items-center bg-gray-200"
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
