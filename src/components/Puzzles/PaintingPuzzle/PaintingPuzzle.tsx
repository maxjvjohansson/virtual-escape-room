import {
  MyersCorrectPieces,
  MyersFakePieces,
  Piece,
} from "./paintingPuzzleData";
import { useState, useEffect } from "react";
import Image from "next/image";
import PaintingPuzzlePieces from "./PaintingPuzzlePieces";

type PaintingPuzzleProps = {
  onSolved?: () => void;
};

export default function PaintingPuzzle({ onSolved }: PaintingPuzzleProps) {
  const [painting, setPainting] = useState<(Piece | null)[]>(
    Array(6).fill(null)
  );
  const [inventory, setInventory] = useState<Piece[]>([]);

  function shuffle<T>(array: T[]): T[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  useEffect(() => {
    const clueIndex = Math.floor(Math.random() * MyersCorrectPieces.length);
    const cluePiece = MyersCorrectPieces[clueIndex];

    const newPainting = Array(6).fill(null);
    newPainting[clueIndex] = cluePiece;

    const remaining = MyersCorrectPieces.filter(
      (piece) => piece.id !== cluePiece.id
    );
    const mixedInventory = shuffle([...remaining, ...MyersFakePieces]);

    setPainting(newPainting);
    setInventory(mixedInventory);
  }, []);

  function handleDrop(index: number, piece: Piece) {
    setPainting((prev) => {
      const newPainting = [...prev];
      newPainting[index] = piece;
      return newPainting;
    });
    setInventory((prev) => prev.filter((p) => p.id !== piece.id));
  }

  return (
    <section className="flex flex-col items-center gap-8 p-4">
      <div className="grid grid-cols-2">
        {painting.map((piece, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = e.dataTransfer.getData("piece");
              if (!data) return;
              const droppedPiece: Piece = JSON.parse(data); // fixade stavningen här också
              handleDrop(index, droppedPiece);
            }}
            className="w-32 h-32 border-1 border-dashed border-gray-400 items-center bg-gray-200"
          >
            {piece ? (
              <Image
                src={piece.image}
                alt={`Piece ${piece.id}`}
                width={128}
                height={128}
                className="object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>

      <PaintingPuzzlePieces pieces={inventory}></PaintingPuzzlePieces>
    </section>
  );
}
