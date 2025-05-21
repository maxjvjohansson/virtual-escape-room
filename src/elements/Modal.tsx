import { ReactNode } from "react";
import Button from "./Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <article
        className="bg-white text-black rounded shadow-lg w-[90%] max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 text-sm text-gray-500 z-50"
        >
          ✕
        </Button>
        {children}
      </article>
    </div>
  );
}
