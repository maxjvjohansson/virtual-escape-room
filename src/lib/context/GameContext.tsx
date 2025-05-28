"use client";

import { createContext, useReducer, useContext, ReactNode } from "react";
import type { GameState, Action } from "./gameTypes";

const initialState: GameState = {
  puzzles: {
    computer: false,
    oddOneOut: false,
    painting: false,
    word: false,
  },
  code: {
    A: null,
    B: null,
    C: null,
    D: null,
  },
  notes: [],
  playerName: "",
  hasTicket: false,
  startedAt: null,
  finishedAt: null,
  isGameOver: false,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SOLVE_PUZZLE":
      return {
        ...state,
        puzzles: {
          ...state.puzzles,
          [action.payload]: true,
        },
      };

    case "SET_CODE_PART":
      return {
        ...state,
        code: {
          ...state.code,
          [action.payload.key]: action.payload.value,
        },
      };

    case "ADD_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case "GENERATE_ESCAPE_CODE":
      const newCode = {
        A: Math.floor(Math.random() * 10),
        B: Math.floor(Math.random() * 10),
        C: Math.floor(Math.random() * 10),
        D: Math.floor(Math.random() * 10),
      };
      return {
        ...state,
        code: newCode,
      };

    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };

    case "SET_HAS_TICKET":
      return { ...state, hasTicket: action.payload };

    case "START_GAME":
      if (typeof window !== "undefined") {
        document.cookie = "game_started=true; path=/; SameSite=None; Secure";
        localStorage.setItem("game_started", "true");
      }
      return { ...state, startedAt: Date.now() };

    case "END_GAME":
      if (typeof window !== "undefined") {
        document.cookie = "game_finished=true; path=/; SameSite=None; Secure";
        localStorage.setItem("game_finished", "true");
      }
      return { ...state, finishedAt: Date.now() };

    case "RESET_GAME":
      if (typeof window !== "undefined") {
        document.cookie =
          "game_started=; Max-Age=0; path=/; SameSite=None; Secure";
        document.cookie =
          "game_finished=; Max-Age=0; path=/; SameSite=None; Secure";

        localStorage.removeItem("game_started");
        localStorage.removeItem("game_finished");
      }
      return { ...initialState };

    case "GAME_OVER":
      return { ...state, isGameOver: true };

    default:
      return state;
  }
}

const GameContext = createContext<
  | {
      state: GameState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
