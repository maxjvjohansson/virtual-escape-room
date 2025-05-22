import { useRouter } from "next/navigation";
import Button from "@/elements/Button";
import DoorIcon from "@assets/icons/door_white.svg";
import Image from "next/image";

export default function GameOver() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col justify-center items-center max-w-2xl mx-auto p-6 md:p-8 border-2 border-purple-500/20 shadow-2xl text-white text-center"
      style={{
        background:
          "linear-gradient(90deg, #111827 0%, #24243B 50%, #18181E 100%)",
      }}
    >
      <Image
        src="/images/skull_white.svg"
        alt="Skull"
        width={48}
        height={48}
        className="mb-4"
      />
      <h1 className="text-4xl font-extrabold mb-4">GAME OVER</h1>

      <p className="text-lg mb-4">
        Time&apos;s up... You failed to escape the room in time.
        <br />
        The door creaks shut behind you, and the darkness settles in.
        <br />
        Perhaps this haunted place is your new home — forever...
      </p>

      <p className="italic text-sm text-purple-300 mb-6">
        &ldquo;Only those who truly seek the light can escape the
        shadows.&ldquo;
      </p>

      <Button
        variant="primary-red"
        onClick={() => router.push("/lobby")}
        aria-label="Return to the lobby"
      >
        <DoorIcon />
        Try Again
      </Button>
    </section>
  );
}
