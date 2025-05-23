import { ReactNode } from "react";
import CloseIcon from "@assets/icons/close_x_white.svg";

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
        className="bg-white text-black rounded shadow-lg max-w-6xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/70 hover:bg-black/30 rounded-full p-2 text-white z-50 cursor-pointer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
        {children}
      </article>
    </div>
  );
}
