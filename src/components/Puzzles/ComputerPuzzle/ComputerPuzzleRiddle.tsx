export type Riddle = {
  question: string;
  answer: string;
  hint: string;
};

export const riddles: Riddle[] = [
  {
    question:
      "It follows you in the dark, but disappears in the light. It mimics you, but never speaks. What is it?",
    answer: "shadow",
    hint: "You only see it when the light is behind you.",
  },
  {
    question:
      "I scream but have no mouth. I'm trapped in glass and haunt your house. What am I?",
    answer: "mirror",
    hint: "It reflects your every move.",
  },
  {
    question:
      "I rest in silence beneath the ground, waiting to hold you when you're found. What am I?",
    answer: "coffin",
    hint: "A final resting place.",
  },
  {
    question:
      "I move without feet, whisper without voice, and chill without touch. What am I?",
    answer: "ghost",
    hint: "Some say I haunt old houses.",
  },
  {
    question:
      "You fear me at night, though I make no sound. I vanish by morning, never to be found. What am I?",
    answer: "nightmare",
    hint: "It fades when you wake up.",
  },
  {
    question:
      "I mark your grave, I watch with stone eyes. I stand through the ages under dark skies. What am I?",
    answer: "statue",
    hint: "I'm carved to remember, often found in cemeteries.",
  },
  {
    question:
      "I feed on your fear, but I’m not really there. You can’t kill me, because I’m just air. What am I?",
    answer: "phantom",
    hint: "You might see me, or think you do, in the corner of your eye.",
  },
  {
    question:
      "Locked away, I rot inside. Yet I once walked with pride. What am I?",
    answer: "skeleton",
    hint: "I’m what remains long after flesh is gone.",
  },
  {
    question:
      "I creak and moan with every breeze. I shelter the lost, the dead, the diseased. What am I?",
    answer: "mansion",
    hint: "A haunted house, perhaps?",
  },
  {
    question:
      "Lit without flame, I flicker at night. I guide the cursed with eerie light. What am I?",
    answer: "lantern",
    hint: "Used to light the way in the dark — but not with fire.",
  },
];

export default function getRandomRiddle(): Riddle {
  return riddles[Math.floor(Math.random() * riddles.length)];
}
