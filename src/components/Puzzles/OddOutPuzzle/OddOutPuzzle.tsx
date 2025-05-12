/* import { useState } from 'react';
import OddOutPuzzleModal from './OddOutPuzzleModal';
import Button from '@/elements/Button';
import { usePuzzle } from '@/hooks/usePuzzle';

export default function OddOutPuzzle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isSolved, solutionDigit } = usePuzzle("oddOneOut", "B");

  const handleOpenModal = () => {
    if (!isSolved) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={handleOpenModal}
        className={`
          px-4 py-2 rounded
          ${isSolved
            ? 'bg-green-600 text-white cursor-default'
            : 'bg-purple-600 text-white hover:bg-purple-700'}
        `}
        disabled={isSolved}
        aria-label={isSolved ? "Puzzle already solved" : "Open the Odd One Out Challenge"}
      >
        {isSolved ? `Puzzle Solved ✓ (Code: B${solutionDigit})` : 'Odd One Out Challenge'}
      </Button>
      
      <OddOutPuzzleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
} */