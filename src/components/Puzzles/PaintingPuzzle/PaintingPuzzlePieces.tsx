import Image from "next/image";
import { Piece } from "./paintingPuzzleData";

type PaintingPuzzlePiecesProps = {
  pieces: Piece[];
};

export default function PaintingPuzzlePieces({
  pieces,
}: PaintingPuzzlePiecesProps) {
  return (
    <section className="flex flex-wrap gap-3 p-1 items-center justify-center">
      {pieces.map((piece) => (
        <Image
          key={piece.id}
          src={piece.image}
          alt={`Piece: ${piece.id}`}
          width={100}
          height={100}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("piece", JSON.stringify(piece));
          }}
        />
      ))}
    </section>
  );
}
