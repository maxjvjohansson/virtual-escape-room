import Modal from "@/elements/Modal";
import PaintingPuzzle from "./PaintingPuzzle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PaintingPuzzleModal({ isOpen, onClose }: Props) {
  const handleSolved = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleSolved}>
      <PaintingPuzzle onSolved={onClose}></PaintingPuzzle>
    </Modal>
  );
}
