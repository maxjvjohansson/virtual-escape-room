import Modal from "@/elements/Modal";
import CodeLock from "./CodeLock";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CodeLockModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CodeLock />
    </Modal>
  );
}
