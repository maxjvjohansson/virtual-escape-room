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
      "I move without feet and chill without touch. I make sounds to scare but when you look im not there. What am I?",
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
      "I rest in silence beneath the ground, waiting to hold you when you're found. What am I?",
    answer: "coffin",
    hint: "A final resting place.",
  },
  {
    question:
      "Locked away, I rot inside. Yet I once walked with pride. What am I?",
    answer: "skeleton",
    hint: "I’m what remains long after flesh is gone.",
  },
  {
    question:
      "I open and close, but have no hands. You knock, and I answer. What am I?",
    answer: "door",
    hint: "You pass through me to enter or leave.",
  },
  {
    question:
      "I hang on the wall and show your face, but break me and bad luck takes place. What am I?",
    answer: "mirror",
    hint: "Some say breaking me brings seven years of misfortune.",
  },
  {
    question:
      "I live in the attic or under the bed. I come out when you're full of dread. What am I?",
    answer: "monster",
    hint: "I'm what kids think hides in the dark.",
  },
  {
    question:
      "You light me up, but I’m not alive. I burn with fire, but I don’t survive. What am I?",
    answer: "candle",
    hint: "I melt slowly in the dark.",
  },
];

export default function getRandomRiddle(): Riddle {
  return riddles[Math.floor(Math.random() * riddles.length)];
}
