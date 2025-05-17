export default function CollectedCodes() {
  const mockNotes = ["A3", "B6", "C7", "D2"];

  return (
    <ul className="flex gap-6 text-white text-xl md:text-4xl tracking-wide">
      {mockNotes.map((note, idx) => (
        <li key={idx}>{note}</li>
      ))}
    </ul>
  );
}
