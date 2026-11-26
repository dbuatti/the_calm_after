# The Calm After

A neurodivergent-friendly grounding app: short exercises, a guided reset, and an
optional check-in that suggests tools by intensity. Everything runs in the
browser; preferences live in `localStorage`.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run lint
```

## How it is organised

- `src/data/tools.tsx` — the single catalogue used by the home page and toolbox.
  Card order is stable; starring a tool never reshuffles the grid.
- `src/pages/Index.tsx` — "Start here" choices (panic / racing thoughts / reset)
  plus quick links to the last used and favourited tools.
- `src/pages/Tools.tsx` — searchable, filterable toolbox. Filters and the open
  tool live in the URL, so links and the back button work predictably.
- `src/pages/Session.tsx` — six-step guided journey; progress is saved
  automatically and starting over asks first.
- `src/hooks/use-quiet-mode.ts` — persistent "Quiet visuals" setting: removes
  rain, lightning, parallax and pulsing. Defaults to the OS reduced-motion
  preference and can be toggled from the sound panel or the toolbox.

Keyboard shortcuts: `B` opens breathing, `M` toggles sound, `Esc` closes dialogs
(save and exits a guided session). Shortcuts never fire while typing or while
another dialog is open.
