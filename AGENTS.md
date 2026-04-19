# AGENTS.md

`capitalize` = small Astro app for transforming titles + headings.

Main user job:

- Type text into one live input field
- See same field update in real time with chosen capitalization mode
- Optionally apply title-case style-guide rules
- Copy result fast

Current product shape:

- One page
- No backend
- Astro component does UI + browser event wiring
- `src/lib/capitalize.ts` holds transform rules + option metadata

## Stack

- Astro 6
- TypeScript
- Vitest
- Plain CSS

## Important Files

- [`src/pages/index.astro`](/Users/colin/Programming/capitalize/src/pages/index.astro): page entry
- [`src/layouts/BaseLayout.astro`](/Users/colin/Programming/capitalize/src/layouts/BaseLayout.astro): document shell and font import
- [`src/components/CapitalizerApp.astro`](/Users/colin/Programming/capitalize/src/components/CapitalizerApp.astro): main UI and client-side behavior
- [`src/lib/capitalize.ts`](/Users/colin/Programming/capitalize/src/lib/capitalize.ts): capitalization modes, style-guide options, transform logic
- [`src/lib/capitalize.test.ts`](/Users/colin/Programming/capitalize/src/lib/capitalize.test.ts): unit tests for text transforms
- [`src/styles/global.css`](/Users/colin/Programming/capitalize/src/styles/global.css): global visual system and layout

## UI Rules

- Keep UI simple, fast, obvious
- Prefer one primary action per screen
- Live input behavior matters: same field user types in should update itself in real time
- Preserve mobile usability
- Prefer small, intentional controls over dashboard-like panels

## Working Rules

- Read code before changing behavior
- Make smallest change that fully solves task
- Keep logic in `src/lib/capitalize.ts`, not scattered through UI
- Reuse shared option arrays so UI stays in sync automatically
- Preserve selection/caret behavior when mutating live input value
- Keep comments rare and useful
- Use modern code practices

## Commit Rule

Commit after checkpoints, not only end.

Commit rules:

- use Conventional Commits
- prefer `feat:` for user-facing features
- prefer `fix:` for bug fixes
- prefer `docs:` for docs-only changes
- do not batch unrelated work into one commit
