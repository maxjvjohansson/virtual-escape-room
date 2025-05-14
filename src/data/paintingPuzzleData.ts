export type Piece = {
  id: number;
  image: string;
  correctIndex: number | null;
};

export type PuzzleSet = {
  name: string;
  correct: Piece[];
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
};

export const VorheesSet: PuzzleSet = {
  name: "vorhees",
  correct: Array.from({ length: 12 }, (_, i) => ({
    id: i,
    image: `/paintingPuzzlePaintings/vorhees/vorhees-${i + 1}.png`,
    correctIndex: i,
  })),
};

export const PuzzleSets: PuzzleSet[] = [MyersSet, VorheesSet];
