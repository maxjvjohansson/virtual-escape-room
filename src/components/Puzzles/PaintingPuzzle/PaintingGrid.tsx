import Image from "next/image";
import { Piece } from "@/data/paintingPuzzleData";

type Props = {
  painting: (Piece | null)[];
  cluePiece: Piece | null;
  selectedPiece: Piece | null;
  handleClick: (index: number) => void;
  handleDrop: (
    piece: Piece,
    index: number,
    source: string,
    fromIndex: number
  ) => void;
  focusMode: boolean;
};

export default function PaintingGrid({
  painting,
  cluePiece,
  selectedPiece,
  handleClick,
  focusMode,
  handleDrop,
}: Props) {
  return (
    <div className="grid grid-cols-3 p-6 gap-1">
      {painting.map((piece, index) => (
        <div
          key={index}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const data = e.dataTransfer.getData("piece");
            const source = e.dataTransfer.getData("source");
            const fromIndex = parseInt(e.dataTransfer.getData("fromIndex"), 10);
            if (!data) return;
            const droppedPiece: Piece = JSON.parse(data);
            handleDrop(droppedPiece, index, source, fromIndex);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick(index);
            }
          }}
          tabIndex={focusMode ? 0 : -1}
          data-painting-index={index}
          onClick={() => handleClick(index)}
          className="md:w-16 md:h-18 h-14 w-12 border-1 border-[#3F2915] items-center bg-[#30260C] justify-center duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all focus:shadow-[0_0_50px_rgba(190,140,60,0.7)] cursor-pointer"
        >
          {piece && (
            <Image
              src={piece.image}
              alt={`Piece ${piece.id}`}
              width={720}
              height={720}
              draggable={piece.id !== cluePiece?.id}
              onDragStart={(e) => {
                e.dataTransfer.setData("piece", JSON.stringify(piece));
                e.dataTransfer.setData("source", "painting");
                e.dataTransfer.setData("fromIndex", index.toString());
              }}
              className={`border-1 ${
                selectedPiece?.id === piece.id
                  ? "border-yellow-400 border-2"
                  : "border-transparent"
              } duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all focus:shadow-[0_0_50px_rgba(190,140,60,0.7)] h-14 w-12 md:w-16 md:h-18`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
