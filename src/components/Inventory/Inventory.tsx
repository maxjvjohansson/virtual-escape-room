import Timer from "../Timer/Timer";
import { useGameContext } from "@/lib/context/GameContext";
import Image from "next/image";

export default function Inventory() {
  const { state } = useGameContext();

  return (
    <div className="relative w-full max-w-[700px] aspect-[7/1] mx-auto px-4">
      <Image
        src="/images/inventory.png"
        alt="Inventory"
        fill
        className="object-contain"
        priority
      />

      <div className="absolute inset-0 flex items-center justify-between pl-6">
        <Timer
          startedAt={state.startedAt}
          finishedAt={state.finishedAt}
          durationMs={60 * 60 * 1000}
        />
      </div>
    </div>
  );
}
