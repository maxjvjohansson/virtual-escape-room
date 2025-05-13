import Modal from "@/elements/Modal";
import GameOver from "./GameOver";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GameOverModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <GameOver />
    </Modal>
  );
}
