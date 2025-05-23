import Image from "next/image";
import { Piece } from "@/data/paintingPuzzleData";

type PaintingPuzzlePiecesProps = {
  pieces: Piece[];
  onSelect: (piece: Piece) => void;
  selectedPiece: Piece | null;
  onDropToInventory: (piece: Piece, fromIndex?: number) => void;
  onClick: (piece: Piece) => void;
  focusMode: boolean;
};

export default function PaintingPuzzlePieces({
  pieces,
  onSelect,
  selectedPiece,
  focusMode,
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
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && selectedPiece) {
          onClick(selectedPiece);
        }
      }}
      className="flex flex-wrap gap-2 items-center justify-center w-full p-4 border-2 border-[#3F2915] focus:shadow-[0_0_50px_rgba(255,215,0.6)]"
    >
      {pieces.map((piece, index) => (
        <Image
          tabIndex={focusMode ? 0 : -1}
          data-inventory-index={index}
          key={piece.id}
          src={piece.image}
          alt={`Painting Piece`}
          onClick={() => onSelect(piece)}
          className={`border-1 ${
            selectedPiece?.id === piece.id
              ? "border-yellow-400 border-2 shadow-[0_0_30px_rgba(190,140,60,0.7)] focus:ring-yellow-600 focus:shadow-[0_0_30px_rgba(190,140,60,0.7)]"
              : "border-transparent"
          } hover:border-1 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(190,140,60,0.7)] transition-all w-12 h-14 md:w-16 md:h-18 duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer`}
          width={720}
          height={720}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(piece);
            }
          }}
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
