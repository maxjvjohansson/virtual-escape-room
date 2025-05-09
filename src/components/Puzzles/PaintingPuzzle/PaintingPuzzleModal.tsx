import Modal from "@/elements/Modal";
import PaintingPuzzle from "./PaintingPuzzle";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PaintingPuzzleModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <PaintingPuzzle></PaintingPuzzle>
    </Modal>
  );
}
