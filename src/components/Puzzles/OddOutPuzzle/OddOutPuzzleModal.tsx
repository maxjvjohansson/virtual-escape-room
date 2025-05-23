import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@/elements/Modal";
import {
  OddOutImage,
  OddOutImageSet,
  getRandomOddOutSet,
} from "@/data/OddOutPuzzleData";
import { usePuzzle } from "@/hooks/usePuzzle";

type OddOutPuzzleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const randomOddOutSet = getRandomOddOutSet();

export default function OddOutPuzzleModal({
  isOpen,
  onClose,
}: OddOutPuzzleModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentOddOutSet, setCurrentOddOutSet] = useState<OddOutImageSet>(() =>
    getRandomOddOutSet()
  );
  const [wrongGuessCount, setWrongGuessCount] = useState(0);
  const { isSolved, solutionDigit, solve } = usePuzzle("oddOneOut", "B");

  useEffect(() => {
    if (isOpen && !isSolved) {
      setErrorMessage(null);
      setCurrentOddOutSet(randomOddOutSet);
      setWrongGuessCount(0);
    }
  }, [isOpen, isSolved]);

  const handleImageClick = (image: OddOutImage) => {
    if (isSolved) return;

    if (image.isOddOne) {
      solve();
      setErrorMessage(null);
    } else {
      const newWrongGuessCount = wrongGuessCount + 1;
      setWrongGuessCount(newWrongGuessCount);
      
      if (newWrongGuessCount >= 3) {
        // Reset puzzle with new random set
        setCurrentOddOutSet(getRandomOddOutSet());
        setWrongGuessCount(0);
        setErrorMessage("Too many wrong guesses! Here's a new puzzle.");
      } else {
        setErrorMessage("That's not the odd one out. Look carefully!");
      }
      
      setTimeout(() => {
        setErrorMessage(null);
      }, 3500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="p-8 max-w-4xl mx-auto" 
      style={{
        background:
          "linear-gradient(90deg, #111827 0%, #24243B 50%, #18181E 100%)",
      }}>
        <h2 className="text-2xl mb-4 font-bold text-center text-white">
          Find the odd one out!
        </h2>

        {!isSolved ? (
          <>
            <p className="text-center mb-2 text-white">Which card doesn&apos;t belong?</p>
            
            <p className="text-center mb-6 text-gray-300 text-sm">
              Guesses used: {wrongGuessCount}/3
            </p>

            {errorMessage && (
              <p className="bg-red-100 text-red-800 p-3 mb-4 rounded max-w-fit mx-auto">
                {errorMessage}
              </p>
            )}

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {currentOddOutSet.images.map((image: OddOutImage) => (
              <button
                key={image.id}
                onClick={() => handleImageClick(image)}
                className="md:hover:-translate-y-0.5 md:hover:shadow-black rounded-[0.6rem] overflow-hidden transition-all duration-200 p-0 bg-transparent cursor-pointer
                "
                aria-label={`Select image: ${image.alt}`}
              >
                <div className="relative w-36 aspect-[465/771] bg-white">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                  />
                </div>
              </button>
            ))}
          </div>
          </>
        ) : (
          <div className="text-center">
            <p className="bg-green-100 text-green-800 p-3 mb-4 rounded max-w-fit mx-auto">
              Well done! You&apos;ve found the odd one out.
            </p>
            <p className="text-xl mb-4 text-white">
              You&apos;ve discovered code digit:{" "}
              <span className="font-bold text-2xl text-white">B{solutionDigit}</span>
            </p>
          </div>
        )}
      </section>
    </Modal>
  );
}