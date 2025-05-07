import Button from "@/elements/Button";
import InputField from "@/elements/InputField";

export default function LobbyForm() {
  return (
    <form className="bg-black/60 p-6 rounded-xl w-full max-w-md mx-auto flex flex-col gap-6">
      <InputField
        id="playerName"
        placeholder="Enter your name"
        className="w-full"
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-lg">Ticket Price: 2€</p>
        <Button className="bg-purple-600 hover:bg-purple-700">
          Buy Ticket
        </Button>
      </div>

      <Button type="submit" className="bg-green-600 hover:bg-green-700">
        Start Game
      </Button>

      <Button className="bg-gray-600 hover:bg-gray-700">Instructions</Button>
    </form>
  );
}
