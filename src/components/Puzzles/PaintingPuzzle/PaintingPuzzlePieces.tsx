import Image from "next/image";
import { Piece } from "./paintingPuzzleData";

type PaintingPuzzlePiecesProps = {
  pieces: Piece[];
  onSelect: (piece: Piece) => void;
  selectedPiece: Piece | null;
};

export default function PaintingPuzzlePieces({
  pieces,
  onSelect,
  selectedPiece,
}: PaintingPuzzlePiecesProps) {
  return (
    <section className="flex flex-wrap gap-2 items-center justify-center">
      {pieces.map((piece) => (
        <Image
          key={piece.id}
          src={piece.image}
          alt={`Piece: ${piece.id}`}
          onClick={() => onSelect(piece)}
          className={`border-1 ${
            selectedPiece?.id === piece.id
              ? "border-red-400 border-2"
              : "border-transparent"
          }`}
          width={75}
          height={75}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("piece", JSON.stringify(piece));
          }}
        />
      ))}
    </section>
  );
}
