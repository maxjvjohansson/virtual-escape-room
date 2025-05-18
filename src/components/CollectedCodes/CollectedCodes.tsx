import { useGameContext } from "@/lib/context/GameContext";

export default function CollectedCodes() {
  const mockNotes = ["A3", "B6", "C7", "D2"];
  const { state } = useGameContext();
  const code = state.code;
  const computerSolved = state.puzzles.computer;
  const oddoutSolved = state.puzzles.oddOneOut;
  const wordSolved = state.puzzles.word;
  const paintingSolved = state.puzzles.painting;
  console.log("YAAY" ,code.A);

  return (
    <ul className="flex gap-6 text-white text-xl md:text-4xl tracking-wide">
      {mockNotes.map((note, idx) => (
        <li key={idx}>{note}</li>
      ))}
    </ul>
  );
}
