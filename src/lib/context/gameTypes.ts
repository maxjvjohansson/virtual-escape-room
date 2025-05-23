export type PuzzleKey = "computer" | "oddOneOut" | "painting" | "word";

export type CodeKey = "A" | "B" | "C" | "D";

export type GameState = {
  puzzles: Record<PuzzleKey, boolean>;
  code: Record<CodeKey, number | null>;
  notes: string[];
  playerName: string;
  hasTicket: boolean;
  startedAt: number | null;
  finishedAt: number | null;
  isGameOver: boolean;
};

export type Action =
  | { type: "SOLVE_PUZZLE"; payload: PuzzleKey }
  | { type: "SET_CODE_PART"; payload: { key: CodeKey; value: number } }
  | { type: "ADD_NOTE"; payload: string }
  | { type: "GENERATE_ESCAPE_CODE" }
  | { type: "SET_PLAYER_NAME"; payload: string }
  | { type: "SET_HAS_TICKET"; payload: boolean }
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "RESET_GAME" }
  | { type: "GAME_OVER" };
