import { useRouter } from "next/navigation";
import Button from "@/elements/Button";

export default function GameOver() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-extrabold text-red-600 drop-shadow mb-4 animate-pulse">
        GAME OVER
      </h1>
      <p className="text-lg mb-6 max-w-md">
        Time&apos;s up... You failed to escape the room.
        <br />
        Perhaps this place is your new home — forever.
      </p>
      <Button
        className="bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg shadow transition-all"
        onClick={() => router.push("/lobby")}
        aria-label="Return to the lobby"
      >
        Try Again
      </Button>
    </section>
  );
}
