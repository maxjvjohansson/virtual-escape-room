import Image from "next/image";
import { Piece } from "../../../data/paintingPuzzleData";

type PaintingPuzzlePiecesProps = {
  pieces: Piece[];
  onSelect: (piece: Piece) => void;
  selectedPiece: Piece | null;
  onDropToInventory: (piece: Piece, fromIndex?: number) => void;
  onClick: (piece: Piece) => void;
};

export default function PaintingPuzzlePieces({
  pieces,
  onSelect,
  selectedPiece,
  onDropToInventory,
  onClick,
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
      onClick={() => {
        if (selectedPiece) {
          onClick(selectedPiece);
        }
      }}
      className="flex flex-wrap gap-2 items-center justify-center w-full p-2 bg-gray-200 border-1 border-gray-400"
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
          width={62}
          height={62}
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
