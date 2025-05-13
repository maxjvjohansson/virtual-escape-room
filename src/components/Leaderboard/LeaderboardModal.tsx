import Modal from "@/elements/Modal";
import Leaderboard from "./Leaderboard";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LeaderboardModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Leaderboard />
    </Modal>
  );
}
