import { useState, useEffect, Fragment } from 'react';
import Modal from '@/elements/Modal';
import Button from "@/elements/Button";
import InputField from "@/elements/InputField";
import { getRandomWord } from '@/data/WordPuzzleData';
import { usePuzzle } from '@/hooks/usePuzzle';
import { shuffle } from '@/utils/shuffleArray';

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
  onDragEnd
}: LetterTileProps) {
  return (
    <div
      draggable
      className={`
        border-2 p-4 text-center text-xl font-bold rounded-lg cursor-move h-16 w-16 flex items-center justify-center
        ${isDragging ? 'opacity-50 border-dashed' : 'opacity-100'}
        ${isDropTarget ? 'bg-blue-100 border-amber-950' : 'border-gray-300 hover:border-gray-500'}
        transition-all duration-200
      `}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      aria-label={`Letter tile: ${letter}`}
    >
      {letter}
    </div>
  );
}

function DropZone({ 
  index, 
  isActive, 
  onDragOver, 
  onDrop 
}: { 
  index: number, 
  isActive: boolean, 
  onDragOver: (e: React.DragEvent, index: number) => void, 
  onDrop: (e: React.DragEvent) => void 
}) {
  return (
    <div 
      className={`w-2 h-16 mx-1 rounded-full transition-all duration-200 ${isActive ? 'bg-amber-950 w-4' : 'bg-transparent'}`}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={onDrop}
    />
  );
}

export default function WordPuzzleModal({ isOpen, onClose }: WordPuzzleModalProps) {
  const [selectedWord, setSelectedWord] = useState("");
  const [currentArrangement, setCurrentArrangement] = useState<string[]>([]);
  const [inputGuess, setInputGuess] = useState("");

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
    } while (shuffled.join('') === newWord);
    
    setCurrentArrangement(shuffled);
    setErrorMessage(null);
  };

  useEffect(() => {
    if (!isSolved && (currentArrangement.length === 0 || (isOpen && selectedWord === ""))) {
      setupNewPuzzle();
    }
  }, [isOpen, isSolved, currentArrangement.length, selectedWord]);

  // Check if puzzle is solved whenever the arrangement changes
  useEffect(() => {
    if (currentArrangement.length > 0 && selectedWord) {
      const current = currentArrangement.join('');
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
      
      const adjustedDropIndex = dropZoneIndex > draggedIndex ? dropZoneIndex - 1 : dropZoneIndex;
      newArrangement.splice(adjustedDropIndex, 0, draggedLetter);
      
      setCurrentArrangement(newArrangement);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropZoneIndex(null);
  };

  // Handle inputfield option 
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
      <section className="p-4">
        <h2 className="text-2xl mb-4 font-bold text-center">Unscramble the Word</h2>
        
        {!isSolved ? (
          <>
            <p className="mb-4 text-center">What word is this?</p>
            
            {errorMessage && (
              <p className="bg-red-100 text-red-800 p-3 mb-4 rounded text-center">
                {errorMessage}
              </p>
            )}
            
            <div className="flex flex-wrap justify-center gap-y-1.5 mb-6">

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
          </>
        ) : (
          <div className="text-center">
            <p className="bg-green-100 text-green-800 p-3 mb-4 rounded">
              Well done! The right word was <span className="font-bold">{selectedWord}</span>.
            </p>
            <p className="text-xl mb-4">
              You&apos;ve discovered code digit: <span className="font-bold text-2xl">C{solutionDigit}</span>
            </p>
          </div>
        )}
      </section>
      <form
      onSubmit={handleSubmit}
      className="bg-gray-50/60 p-6 rounded-xl w-full max-w-md mx-auto flex flex-col gap-6"
    >
      <InputField
        id="inputGuess"
        placeholder="Write your guess instead..."
        value={inputGuess}
        onChange={handleInputChange}
        className="w-full"
        required
      />
      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Enter guess
      </Button>
      </form>
    </Modal>
  );
}