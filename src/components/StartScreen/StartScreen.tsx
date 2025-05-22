import Button from "@/elements/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LeaderboardModal from "../Leaderboard/LeaderboardModal";

export default function StartScreen() {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
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
          variant="primary-red"
          className="w-48 md:w-64"
          onClick={() => router.push("/lobby")}
        >
          Buy Ticket
        </Button>
        <Button
          variant="primary-red"
          className="w-48 md:w-64"
          onClick={() => setShowLeaderboard(true)}
        >
          Leaderboard
        </Button>
        <LeaderboardModal
          isOpen={showLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      </div>
    </section>
  );
}
