export default function InstructionsText() {
  return (
    <article className="space-y-4 text-sm">
      <p>
        <strong>Welcome to The Haunted Escape.</strong>
        <br />
        Your goal is to escape the haunted basement by solving puzzles and
        uncovering the final 4-digit code.
      </p>

      <ul className="list-disc list-inside pl-4">
        <li>Click on objects in the room to open puzzles.</li>
        <li>
          Each puzzle, when solved, will reveal a part of the escape code (e.g.,
          A3).
        </li>
        <li>
          There are 4 unique puzzles. Solve all of them to unlock the final
          door.
        </li>
        <li>You may revisit puzzles at any time.</li>
        <li>The faster you escape, the higher you score on the leaderboard.</li>
      </ul>

      <p>
        Don’t forget: some elements are there just to spook you... or distract
        you.
      </p>
    </article>
  );
}
