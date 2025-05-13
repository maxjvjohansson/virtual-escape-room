export type Piece = {
  id: number;
  image: string;
  correctIndex: number | null;
};

export type PuzzleSet = {
  name: string;
  correct: Piece[];
  fake: Piece[];
};

export const MyersSet: PuzzleSet = {
  name: "myers",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/myers/myers-${i + 1}.png`,
    correctIndex: i,
  })),
  fake: [
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
  ],
};

export const VorheesSet: PuzzleSet = {
  name: "vorhees",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/vorhees/vorhees-${i + 1}.png`,
    correctIndex: i,
  })),
  fake: [
    {
      id: 100,
      image: "/paintingPuzzlePaintings/myers/myers-1.png",
      correctIndex: null,
    },
    {
      id: 101,
      image: "/paintingPuzzlePaintings/myers/myers-4.png",
      correctIndex: null,
    },
  ],
};

export const PuzzleSets: PuzzleSet[] = [MyersSet, VorheesSet];
