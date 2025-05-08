import Modal from "@/elements/Modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OddOutPuzzleModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Gamecomponents goes in between section tags */}
      <section></section>
    </Modal>
  );
}
