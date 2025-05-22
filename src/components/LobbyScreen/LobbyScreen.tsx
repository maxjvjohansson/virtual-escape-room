import LobbyForm from "./LobbyForm";

export default function LobbyScreen() {
  return (
    <section
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/mansion_bg.png')" }}
    >
      <LobbyForm />
    </section>
  );
}
