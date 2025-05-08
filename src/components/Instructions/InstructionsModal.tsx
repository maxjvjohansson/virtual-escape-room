import Modal from "@/elements/Modal";
import InstructionsText from "./InstructionsText";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function InstructionsModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InstructionsText />
    </Modal>
  );
}
