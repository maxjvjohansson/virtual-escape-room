import Image from "next/image";

export default function StampAward() {
  return (
    <div>
      <Image
        src="/images/gold_raven.png"
        alt="Image of a raven in gold"
        width={80}
        height={80}
      />
    </div>
  );
}
