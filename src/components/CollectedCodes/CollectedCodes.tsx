import { useGameContext } from "@/lib/context/GameContext";

export default function CollectedCodes() {
  const { state } = useGameContext();
  const code = state.code;
  const computerSolved = state.puzzles.computer;
  const oddoutSolved = state.puzzles.oddOneOut;
  const wordSolved = state.puzzles.word;
  const paintingSolved = state.puzzles.painting;

  return (
    <ul className="flex gap-6 text-white text-xl md:text-4xl tracking-wide">
      {computerSolved && <p>A{code.A}</p>}
      {oddoutSolved && <p>B{code.B}</p>}
      {wordSolved && <p>C{code.C}</p>}
      {paintingSolved && <p>D{code.D}</p>}
    </ul>
  );
}
