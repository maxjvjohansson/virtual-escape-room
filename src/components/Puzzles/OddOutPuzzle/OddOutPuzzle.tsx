import { useState } from 'react';
import OddOutPuzzleModal from './OddOutPuzzleModal';
import Button from '@/elements/Button';

type OddOutPuzzleProps = {
  onSolve: () => void;
  alreadySolved?: boolean;
};

export default function OddOutPuzzle({ onSolve, alreadySolved = false }: OddOutPuzzleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(alreadySolved);
  
  const handleSolve = () => {
    setIsPuzzleSolved(true);
    onSolve();
  };
  
  const handleOpenModal = () => {
    if (!isPuzzleSolved) {
      setIsModalOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <Button 
        onClick={handleOpenModal}
        className={`
          px-4 py-2 rounded
          ${isPuzzleSolved 
            ? 'bg-green-600 text-white cursor-default' 
            : 'bg-purple-600 text-white hover:bg-purple-700'}
        `}
        disabled={isPuzzleSolved}
        aria-label={isPuzzleSolved ? "Puzzle already solved" : "Open the Odd One Out Challenge"}
      >
        {isPuzzleSolved ? 'Puzzle Solved ✓' : 'Odd One Out Challenge'}
      </Button>
      
      <OddOutPuzzleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSolve={handleSolve}
      />
    </div>
  );
}
