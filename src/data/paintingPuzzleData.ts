export type Piece = {
  id: number;
  image: string;
  correctIndex: number | null;
};

export type PuzzleSet = {
  name: string;
  correct: Piece[];
  fullImage: string;
};

export function getRandomFakePieces(
  allSets: PuzzleSet[],
  excludeSetName: string,
  count: number
): Piece[] {
  const otherPieces: Piece[] = allSets
    .filter((set) => set.name !== excludeSetName)
    .flatMap((set) => set.correct);

  const shuffled: Piece[] = [...otherPieces].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count).map((p, i) => ({
    ...p,
    id: 1000 + i,
    correctIndex: null,
  }));
}

export const MyersSet: PuzzleSet = {
  name: "myers",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/myers/myers-${i + 1}.png`,
    correctIndex: i,
  })),
  fullImage: "/paintingPuzzlePaintings/myers/myers-full.png",
};

export const VorheesSet: PuzzleSet = {
  name: "vorhees",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/vorhees/vorhees-${i + 1}.png`,
    correctIndex: i,
  })),
  fullImage: "/paintingPuzzlePaintings/vorhees/vorhees-full.png",
};

export const leatherfaceSet: PuzzleSet = {
  name: "leatherface",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/leatherface/leatherface-${i + 1}.png`,
    correctIndex: i,
  })),
  fullImage: "/paintingPuzzlePaintings/leatherface/leatherface-full.png",
};

export const freddySet: PuzzleSet = {
  name: "freddy",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/freddy/freddy-${i + 1}.png`,
    correctIndex: i,
  })),
  fullImage: "/paintingPuzzlePaintings/freddy/freddy-full.png",
};

export const ghostfaceSet: PuzzleSet = {
  name: "ghostface",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/ghostface/ghostface-${i + 1}.png`,
    correctIndex: i,
  })),
  fullImage: "/paintingPuzzlePaintings/ghostface/ghostface-full.png",
};

export const PuzzleSets: PuzzleSet[] = [
  MyersSet,
  VorheesSet,
  leatherfaceSet,
  freddySet,
  ghostfaceSet,
];
