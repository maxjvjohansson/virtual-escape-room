import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from '@/elements/Modal';
import Button from '@/elements/Button';
import { WordPuzzleWords, getRandomWord } from '@/data/WordPuzzleData';
import { usePuzzle } from '@/hooks/usePuzzle';

type WordPuzzleModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WordPuzzleModal({ isOpen, onClose }: WordPuzzleModalProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentWord, setCurrentWord] = useState<string>(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState<string[] | null>(null);
  const { isSolved, solutionDigit, solve } = usePuzzle("word", "C");

  const currentWordArray: string[] = currentWord.split("");

  useEffect(() => {
    if (isOpen && !isSolved) {
      setErrorMessage(null);
      setCurrentWord(getRandomWord());
    }
  }, [isOpen, isSolved]);



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="p-2">
        <h2 className="text-2xl mb-4 font-bold text-center">Guess the word!</h2>
        
        {!isSolved ? (
          <>
            <p>Re-arrange the letters to form the secret word</p>
            
            {errorMessage && (
              <p className="bg-red-100 text-red-800 p-3 mb-4 rounded">
                {errorMessage}
              </p>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {currentWordArray.map((letter: string) => (
                <div
                  key={letter}
                  className="border-2 border-gray-300 hover:border-gray-500 rounded-lg overflow-hidden transition-all duration-200"
                  aria-label={`Move the letter: ${letter}`}
                >
                {letter}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="bg-green-100 text-green-800 p-3 mb-4 rounded">
              Well done! The right word was {currentWord}.
            </p>
            <p className="text-xl mb-4">
              You&apos;ve discovered code digit: <span className="font-bold text-2xl">B{solutionDigit}</span>
            </p>
          </div>
        )}
      </section>
    </Modal>
  );
}