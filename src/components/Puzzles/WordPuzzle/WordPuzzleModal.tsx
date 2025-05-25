import { useState, useEffect, Fragment } from "react";
import Modal from "@/elements/Modal";
import ArrowIconDown from "@assets/icons/arrow_down_black.svg";
import ArrowIconUp from "@assets/icons/arrow_up_black.svg";
import { getRandomWord } from "@/data/WordPuzzleData";
import { usePuzzle } from "@/hooks/usePuzzle";
import { shuffle } from "@/utils/shuffleArray";

type WordPuzzleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type LetterTileProps = {
  letter: string;
  index: number;
  isDragging: boolean;
  isDropTarget: boolean;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
};

function LetterTile({
  letter,
  index,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: LetterTileProps) {
  return (
    <div
      draggable
      className={`
        border-2 bg-gradient-to-b from-[#FDFAF7] to-[#ECE2D4] p-4 text-center text-4xl rounded-lg cursor-move h-16 w-16 flex items-center justify-center
        ${isDragging ? "opacity-50 border-dashed " : "opacity-100"}
        ${
          isDropTarget
            ? "bg-blue-100 border-amber-950"
            : "border-[#7d6849] hover:border-[#392E1E]"
        }
        transition-all duration-200
      `}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      aria-label={`Letter tile: ${letter}`}
    >
      {letter.toLocaleUpperCase()}
    </div>
  );
}

function DropZone({
  index,
  isActive,
  onDragOver,
  onDrop,
}: {
  index: number;
  isActive: boolean;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent) => void;
}) {
  return (
    <div
      className={`w-2 h-16 mx-1 rounded-full transition-all duration-200 ${
        isActive ? "bg-amber-950 w-4" : "bg-transparent"
      }`}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
    />
  );
}

export default function WordPuzzleModal({
  isOpen,
  onClose,
}: WordPuzzleModalProps) {
  const [selectedWord, setSelectedWord] = useState("");
  const [currentArrangement, setCurrentArrangement] = useState<string[]>([]);
  const [inputGuess, setInputGuess] = useState("");
  const [showInput, setShowInput] = useState<boolean>(false);

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropZoneIndex, setDropZoneIndex] = useState<number | null>(null);

  // Game state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isSolved, solutionDigit, solve } = usePuzzle("word", "C");

  const setupNewPuzzle = () => {
    const newWord = getRandomWord();
    setSelectedWord(newWord);

    // Create shuffled version ensuring it's not already solved
    let shuffled;
    do {
      shuffled = shuffle([...newWord]);
    } while (shuffled.join("") === newWord);

    setCurrentArrangement(shuffled);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (
      !isSolved &&
      (currentArrangement.length === 0 || (isOpen && selectedWord === ""))
    ) {
      setupNewPuzzle();
    }
  }, [isOpen, isSolved, currentArrangement.length, selectedWord]);

  // Check if puzzle is solved whenever the arrangement changes
  useEffect(() => {
    if (currentArrangement.length > 0 && selectedWord) {
      const current = currentArrangement.join("");
      const correct = selectedWord;

      if (current === correct && !isSolved) {
        solve();
      }
    }
  }, [currentArrangement, selectedWord, solve, isSolved]);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropZoneIndex(index);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (draggedIndex !== null && dropZoneIndex !== null) {
      const newArrangement = [...currentArrangement];

      const draggedLetter = newArrangement.splice(draggedIndex, 1)[0];

      const adjustedDropIndex =
        dropZoneIndex > draggedIndex ? dropZoneIndex - 1 : dropZoneIndex;
      newArrangement.splice(adjustedDropIndex, 0, draggedLetter);

      setCurrentArrangement(newArrangement);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  // Handle inputfield option
  const toggleInputForm = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGuess(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputGuess.toLowerCase() === selectedWord.toLowerCase()) {
      // If correct, update the arrangement to match the correct word, if we end up not removing the letters uppon sucess when the design is set!
      setCurrentArrangement([...selectedWord]);
      setErrorMessage(null);
    } else {
      setErrorMessage("That's not the right word. Try again!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="p-5 w-screen max-w-4xl mx-auto bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_rgba(253,_250,_247,_0.87)_0%,_#ECE2D4_100%)]">
      <h2 className="text-4xl mb-3 text-center font-word-puzzle w-fit mx-auto px-1 border-b border-black">
          Unscramble the Word
        </h2>
          <>
            <p className="text-center text-2xl font-word-puzzle">What word is this?</p>

            {errorMessage && (
              <p className="bg-red-100 text-red-800 p-3 mb-4 rounded text-center max-w-fit mx-auto">
                {errorMessage}
              </p>
            )}
            {isSolved && (
              <div className="text-center">
              <p className="bg-green-100 text-green-800 p-3 mb-4 mt-4 rounded max-w-fit mx-auto">
                Well done! The right word was{" "}
                <span className="font-bold">{selectedWord}</span>.
              </p>
              <p className="text-xl mb-4">
                You&apos;ve discovered code digit:{" "}
                <span className="font-bold text-2xl">C{solutionDigit}</span>
              </p>
            </div>
            )}

            <div className="flex flex-wrap justify-center gap-y-1.5 mb-18 mt-10">
              <DropZone
                index={0}
                isActive={dropZoneIndex === 0}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />

              {currentArrangement.map((letter, index) => (
                <Fragment key={index}>
                  <LetterTile
                    letter={letter}
                    index={index}
                    isDragging={draggedIndex === index}
                    isDropTarget={false}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragEnd={handleDragEnd}
                  />
                  <DropZone
                    index={index + 1}
                    isActive={dropZoneIndex === index + 1}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                </Fragment>
              ))}
            </div>
            <p className="text-center text-2xl mb-1 font-word-puzzle justify-self-start">Want to type in your guess instead?</p>
            <button
              type="button"
              onClick={toggleInputForm}
              className="text-lg font-word-puzzle cursor-pointer mb-2 inline-flex flex-row items-center gap-1.5"
            >
              {showInput ? "Hide input field" : "Show input field"} {showInput ? <ArrowIconDown/> : <ArrowIconUp/>}
            </button>
            {showInput && (
              <form
                onSubmit={handleSubmit}
                className="justify-self-start w-full max-w-md flex flex-col gap-3"
              >
                <input
                  id="inputGuess"
                  placeholder="Write your guess instead..."
                  value={inputGuess}
                  onChange={handleInputChange}
                  className="w-60 bg-none border border-b-black rounded-lg text-lg font-word-puzzle p-1 justify-self-start"
                  required
                />
                <button 
                  type="submit"
                  className="bg-black rounded-lg text-white font-word-puzzle justify-self-start w-fit p-2 leading-4" 
                >
                  Enter guess
                </button>
              </form>
            )}
          </>
      </section>
    </Modal>
  );
}
