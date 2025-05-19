import Image from "next/image";
import CollectedCodes from "../CollectedCodes/CollectedCodes";

export default function Inventory() {
  return (
    <div className="relative w-full max-w-[700px] aspect-[7/1] mx-auto">
      <Image
        src="/images/inventory.png"
        alt="Inventory"
        fill
        className="object-contain"
        priority
      />
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 gap-2 md:gap-4">
        <CollectedCodes />
      </div>
    </div>
  );
}
