export function formatTime(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  const milliseconds = ms % 1000;

  const pad = (n: number, size = 2) => String(n).padStart(size, "0");

  return `${hours}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}
