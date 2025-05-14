export const WordPuzzleWords : string[] = [
    "Skeleton",
    "Haunting",
    "Werewolf",
    "Screaming",
    "Zombie",
    "Vampire",
    "Monster"
];

export function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WordPuzzleWords.length);
    return WordPuzzleWords[randomIndex];
}