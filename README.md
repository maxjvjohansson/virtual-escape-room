# The Haunted Escape

_A spooky, interactive escape room built with modern web tech._

Welcome to **The Haunted Escape**, a browser-based digital escape room game where players must solve interactive puzzles, discover hidden clues, and beat the clock to escape a haunted basement.

This game is part of a larger experience within a **digital amusement park platform**, and is only playable by authenticated users through the [Tivoli web-portal](https://tivoli.yrgobanken.vip/). While the game itself is deployed via **Vercel**, it relies on token-based authentication and backend integration with Tivoli's API.

Built with **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**, the game features immersive visuals, audio effects, puzzle mechanics, and a real-time leaderboard. Can you escape before time runs out?

---

## Gameplay

Players navigate a creepy basement environment filled with interactive objects. The objective is to solve **4 unique puzzles**, each revealing a digit of the final **escape code**. When all puzzles are solved, the player unlocks the code lock to escape.

- Solve puzzles like word riddles, pattern recognition, and logic games
- Receive a **stamp reward** upon successful escape
- Compete for the fastest time on the **global leaderboard**
- Ambient sound effects and animations enhance immersion
- Works across devices with mobile swipe hints

---

## Tech Stack

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| **Next.js**      | React framework for SSR & routing |
| **React**        | UI logic and component structure  |
| **TypeScript**   | Type-safe development             |
| **Tailwind CSS** | Utility-first styling framework   |
| **Vercel**       | Hosting and deployment (frontend) |

---

## Features

- Interactive puzzles with unique mechanics
- Dynamic JWT handling for secure access
- API proxy route (`/api/transactions`) for safe backend communication
- Leaderboard system with live score submission
- Responsive design with mobile-first features
- Custom theming, icons, and animations
- Stamp reward system integration

---

## How it Works (Brief)

- Players receive a **JWT token** when the game is embedded in the Tivoli platform (e.g., via `postMessage` from iframe parent)
- The app uses that token to submit **transactions** (buy ticket, award stamp)
- Game state is tracked using `React Context` and a reducer
- Code lock is disabled until all puzzles are solved
- A timer tracks how fast players escape, contributing to their leaderboard score

---

## Deployment

This app is optimized for deployment on [Vercel](https://vercel.com), but any platform that supports Next.js will work.

Note: This app expects to be hosted within the **Tivoli** environment and may not work as a standalone app without proper integration.

---

## License

This project is licensed under the MIT License.

---

## Authors

- Max Johansson - [maxjvjohansson](https://github.com/maxjvjohansson)
- Tobias Andrén - [TobiasAndren](https://github.com/TobiasAndren)
- Jennie Westerlund - [Jennie-Westerlund](https://github.com/Jennie-Westerlund)

---

_Enjoy escaping... if you can._
