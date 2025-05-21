import { useGameContext } from "@/lib/context/GameContext";
import type { PuzzleKey, CodeKey } from "@/lib/context/gameTypes";

export function usePuzzle(puzzleKey: PuzzleKey, codeKey: CodeKey) {
  const { state, dispatch } = useGameContext();

  const isSolved = state.puzzles[puzzleKey];
  const solutionDigit = state.code[codeKey];

  const solve = () => {
    if (isSolved || solutionDigit === null) return;
    dispatch({ type: "SOLVE_PUZZLE", payload: puzzleKey });
    dispatch({ type: "ADD_NOTE", payload: `${codeKey}${solutionDigit}` });
  };

  return { isSolved, solutionDigit, solve };
}
