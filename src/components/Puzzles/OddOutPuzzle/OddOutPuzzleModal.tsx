import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/elements/Modal';
import Button from '@/elements/Button';
import { OddOutImage, OddOutImageSet, getRandomOddOutSet } from '@/components/Puzzles/OddOutPuzzle/OddOutPuzzleData';


type OddOutPuzzleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSolve: () => void; 
};

export default function OddOutPuzzleModal({ isOpen, onClose, onSolve }: OddOutPuzzleModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [currentOddOutSet, setCurrentOddOutSet] = useState<OddOutImageSet>(getRandomOddOutSet());
  
  
  useEffect(() => {
    if (isOpen && isSolved) {
      setIsSolved(false);
      setErrorMessage(null);
      setCurrentOddOutSet(getRandomOddOutSet());
    }
  }, [isOpen, isSolved]);

  const handleImageClick = (image: OddOutImage) => {
    if (isSolved) return;
    
    if (image.isOddOne) {
      setIsSolved(true);
      setErrorMessage(null);
      
      
      setTimeout(() => {
        onSolve();
      }, 1500);
    } else {
      setErrorMessage("That's not the odd one out. Look carefully!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-2xl mb-4 font-bold text-center">Find the odd one out!</h2>
        <p>Which card doesn't belong?</p>
        
        {isSolved && (
          <div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
            Well done! You've found the odd one out.
          </div>
        )}
        
        {errorMessage && !isSolved && (
          <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {currentOddOutSet.images.map((image: OddOutImage) => (
            <button
              onClick={() => handleImageClick(image)}
              className={`border-2 rounded-lg overflow-hidden transition-all duration-200 ${
                isSolved && image.isOddOne
                  ? 'border-green-500 ring-4 ring-green-300'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              disabled={isSolved}
              aria-label={`Select image: ${image.alt}`}
            >
              <div className="relative w-full h-36 md:h-40">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </button>
          ))}
        </div>
        
        {isSolved && (
          <div className="text-center">
            <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            ←
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};