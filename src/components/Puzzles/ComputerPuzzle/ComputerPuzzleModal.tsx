import Modal from "@/elements/Modal";
import ComputerPuzzleScreen from "./ComputerPuzzleScreen";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ComputerPuzzleModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Gamecomponents goes in between section tags */}
      <ComputerPuzzleScreen />
    </Modal>
  );
}
