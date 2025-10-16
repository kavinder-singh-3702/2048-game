# 2048 in React

Functional, component-driven implementation of the 2048 puzzle built with Vite, React, and TypeScript. The UI mirrors the classic aesthetic, supports keyboard and on-screen controls, tracks score/best score, and gracefully handles win/lose states.

## Features

- Pure utility module (`src/core`) driving all board operations and win/lose checks.
- Configurable square board size (defaults to 4×4, options 3–6).
- Keyboard support (arrow keys + WASD) plus accessible button controls.
- Persistent best score via `localStorage`.
- Responsive layout with restart button and overlay for end states.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 to play in development. Vite hot-reloads on every change.

## Scripts

- `npm run dev` – Start the Vite dev server.
- `npm run build` – Emit an optimized production bundle in `dist/`.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint with the project rules.

## Gameplay

1. Use arrow keys, WASD, or the control buttons to slide tiles.
2. Tiles with matching values merge into their sum, boosting your score.
3. After each valid move a new 2 (90%) or 4 (10%) spawns at random.
4. Win when any tile reaches 2048. Lose when no moves remain.

Use the board size selector to start a new game at a different dimension.

## Architecture Notes

- `src/core` contains pure business logic (board generation, movement, win detection). These functions are framework-agnostic, making them reusable across environments or for testing.
- `src/hooks/useGame` wraps a reducer around the pure logic for declarative state updates. `useKeyboard` translates key presses into move actions, keeping side effects isolated.
- `src/components` contains small, composable presentational pieces (`Board`, `ScorePanel`, etc.) wired up by the `Game` container.
- Styling splits global scaffolding (`src/index.css`) from component styling (`src/App.css`) to keep concerns localized.

## Deployment

Any static host works:

- **Vercel / Netlify** – Connect the repo, build with `npm run build`, publish the `dist/` folder.
- **GitHub Pages** – Build locally and push `dist/` via `gh-pages`.
- **Static server / CDN** – Upload the `dist/` artefacts after building.

## License

MIT

