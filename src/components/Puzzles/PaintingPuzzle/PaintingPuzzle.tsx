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
  const [cluePiece, setCluePiece] = useState<Piece | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  function shuffle<T>(array: T[]): T[] {
    return [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  useEffect(() => {
    if (cluePiece === null) {
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
      setCluePiece(cluePiece);
    }
  }, [cluePiece]);

  function handlePlacePiece(index: number) {
    if (!selectedPiece) {
      return;
    }
    handleDrop(index, selectedPiece);
    setSelectedPiece(null);
  }

  function handleDrop(index: number, piece: Piece) {
    if (
      painting[index]?.id ===
      MyersCorrectPieces.find((piece) => piece.correctIndex === index)?.id
    ) {
      return;
    }

    setPainting((prevPainting) => {
      const newPainting = [...prevPainting];

      const currentPiece = newPainting[index];

      if (currentPiece) {
        setInventory((prevInventory) => {
          const newInventory = prevInventory.filter(
            (p) => p.id !== currentPiece.id
          );
          return [...newInventory, currentPiece];
        });
      }

      newPainting[index] = piece;
      return newPainting;
    });
    setInventory((prevPainting) =>
      prevPainting.filter((p) => p.id !== piece.id)
    );
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
              const droppedPiece: Piece = JSON.parse(data);
              handleDrop(index, droppedPiece);
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
