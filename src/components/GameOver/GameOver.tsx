import { useRouter } from "next/navigation";
import Button from "@/elements/Button";

export default function GameOver() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col w-full items-center justify-center text-center p-6 bg-cover"
      style={{ backgroundImage: "url('/images/dark_wall_texture.jpg')" }}
    >
      <h1 className="text-4xl font-extrabold text-[#B81B00] drop-shadow mb-4 animate-pulse">
        GAME OVER
      </h1>
      <p className="text-lg text-white mb-6 max-w-md">
        Time&apos;s up... You failed to escape the room.
        <br />
        Perhaps this place is your new home — forever.
      </p>
      <Button
        className="bg-[#B81B00] hover:bg-red-900 text-white font-semibold py-3 px-6 rounded-lg border-none shadow transition-all"
        onClick={() => router.push("/lobby")}
        aria-label="Return to the lobby"
      >
        Try Again
      </Button>
    </section>
  );
}
