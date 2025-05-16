export const WordPuzzleWords : string[] = [
    "skeleton",
    "haunting",
    "werewolf",
    "screaming",
    "zombie",
    "vampire",
    "monster",
    "coffin",
];

export function getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * WordPuzzleWords.length);
    return WordPuzzleWords[randomIndex];
}