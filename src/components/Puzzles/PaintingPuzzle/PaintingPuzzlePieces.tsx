import Image from "next/image";
import { Piece } from "./paintingPuzzleData";

type PaintingPuzzlePiecesProps = {
  pieces: Piece[];
  onSelect: (piece: Piece) => void;
  selectedPiece: Piece | null;
  onDropToInventory: (piece: Piece, fromIndex?: number) => void;
};

export default function PaintingPuzzlePieces({
  pieces,
  onSelect,
  selectedPiece,
  onDropToInventory,
}: PaintingPuzzlePiecesProps) {
  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const data = e.dataTransfer.getData("piece");
        const fromIndexStr = e.dataTransfer.getData("fromIndex");
        const fromIndex = fromIndexStr ? parseInt(fromIndexStr, 10) : undefined;
        if (!data) return;
        const piece: Piece = JSON.parse(data);
        onDropToInventory(piece, fromIndex);
      }}
      className="flex flex-wrap gap-2 items-center justify-center"
    >
      {pieces.map((piece) => (
        <Image
          key={piece.id}
          src={piece.image}
          alt={`Painting Piece`}
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
            e.dataTransfer.setData("source", "inventory");
          }}
        />
      ))}
    </section>
  );
}
