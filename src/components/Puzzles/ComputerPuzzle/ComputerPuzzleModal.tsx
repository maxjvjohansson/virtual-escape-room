import Modal from "@/elements/Modal";
import ComputerPuzzleScreen from "./ComputerPuzzleScreen";
import getRandomRiddle, { Riddle } from "./ComputerPuzzleRiddle";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ComputerPuzzleModal({ isOpen, onClose }: Props) {
  const [riddle, setRiddle] = useState<Riddle | null>(null);

  useEffect(() => {
    if (isOpen && !riddle) {
      setRiddle(getRandomRiddle);
    }
  }, [isOpen, riddle]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {riddle && <ComputerPuzzleScreen riddle={riddle} />}
    </Modal>
  );
}
