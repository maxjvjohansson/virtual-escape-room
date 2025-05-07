import Button from "@/elements/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StartScreen() {
  const router = useRouter();

  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/haunted_mansion.png')" }}
    >
      <div className="w-64 md:w-96 mb-8">
        <Image
          src="/images/logo.svg"
          alt="The Haunted Escape logo"
          width="0"
          height="0"
          priority
          className="w-auto h-auto"
        />
      </div>
      <div className="flex flex-col justify-between gap-4 md:gap-8">
        <Button
          className="w-48 md:w-64 bg-red-600 hover:bg-red-800"
          onClick={() => router.push("/lobby")}
        >
          Buy Ticket
        </Button>
        <Button className="w-48 md:w-64 bg-red-600 hover:bg-red-800">
          Leaderboard
        </Button>
      </div>
    </section>
  );
}
