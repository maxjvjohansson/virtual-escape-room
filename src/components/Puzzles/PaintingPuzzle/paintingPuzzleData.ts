export type Piece = {
  id: number;
  image: string;
  correctIndex: number | null;
};

export const MyersCorrectPieces: Piece[] = Array.from(
  { length: 6 },
  (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/myers/myers-${i + 1}.png`,
    correctIndex: i,
  })
);

export const MyersFakePieces: Piece[] = [
  {
    id: 100,
    image: "/paintingPuzzlePaintings/vorhees/vorhees-1.png",
    correctIndex: null,
  },
  {
    id: 101,
    image: "/paintingPuzzlePaintings/vorhees/vorhees-4.png",
    correctIndex: null,
  },
];

const randomIndex = Math.floor(Math.random() * MyersCorrectPieces.length);
export const CluePiece: Piece = MyersCorrectPieces[randomIndex];
