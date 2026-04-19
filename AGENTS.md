# AGENTS.md

## Project

`capitalize` is small Astro app for transforming titles and headings.

Main user job:
- Type text into one live input field
- See same field update in real time with chosen capitalization mode
- Optionally apply title-case style-guide rules
- Copy result fast

Current product shape:
- One page
- No backend
- Astro component does UI + browser event wiring
- `src/lib/capitalize.ts` holds transformation rules and option metadata

## Stack

- Astro 6
- TypeScript
- Vitest
- Plain CSS

## Important Files

- [`src/pages/index.astro`](/Users/colin/Programming/capitalize/src/pages/index.astro): page entry
- [`src/layouts/BaseLayout.astro`](/Users/colin/Programming/capitalize/src/layouts/BaseLayout.astro): document shell and font import
- [`src/components/CapitalizerApp.astro`](/Users/colin/Programming/capitalize/src/components/CapitalizerApp.astro): main UI and client-side behavior
- [`src/lib/capitalize.ts`](/Users/colin/Programming/capitalize/src/lib/capitalize.ts): capitalization modes, style-guide options, transformation logic
- [`src/lib/capitalize.test.ts`](/Users/colin/Programming/capitalize/src/lib/capitalize.test.ts): unit tests for text transforms
- [`src/styles/global.css`](/Users/colin/Programming/capitalize/src/styles/global.css): global visual system and layout

## Source Of Truth

- Treat `src/` as source of truth
- Do not hand-edit `dist/` unless user explicitly asks
- When adding style guides, update both option metadata and transform rules in `src/lib/capitalize.ts`
- When changing transform behavior, add or update tests in `src/lib/capitalize.test.ts`

## UI Rules

- Keep UI simple, fast, obvious
- Prefer one primary action per screen
- Live input behavior matters: same field user types in should update itself in real time
- Avoid separate preview/output field unless user explicitly asks
- Preserve mobile usability
- Prefer small, intentional controls over dashboard-like panels

## Style Guide Rules

- Existing style guides currently differ by small-word handling for title case
- New style guides should not be added as fake labels only; add real rule differences
- If new guide is mostly identical to existing one, call out overlap before expanding complexity
- If guide needs behavior beyond small-word lists, update transform architecture instead of forcing it into current shape

## Working Rules

- Read code before changing behavior
- Make smallest change that fully solves task
- Keep logic in `src/lib/capitalize.ts`, not scattered through UI
- Reuse shared option arrays so UI stays in sync automatically
- Preserve selection/caret behavior when mutating live input value
- Keep comments rare and useful

## Verify

Run these after meaningful changes:

```bash
rtk npm run check
rtk npm test
```

Use these when needed:

```bash
rtk npm run dev
rtk npm run build
```

## Commit Rule

Commit after checkpoints, not only at end.

Checkpoint means:
- user-visible feature complete
- bug fix complete
- refactor complete and verified
- docs/instructions update complete

Commit rules:
- use Conventional Commits
- prefer `feat:` for user-facing features
- prefer `fix:` for bug fixes
- prefer `docs:` for docs-only changes
- do not batch unrelated work into one commit
- run `rtk npm run check` and `rtk npm test` before commit when code changed

Examples:

```bash
git add AGENTS.md src/lib/capitalize.ts src/lib/capitalize.test.ts
git commit -m "feat: add AMA style guide"
```

```bash
git add AGENTS.md
git commit -m "docs: add project agent instructions"
```

## Notes For Future Agents

- User prefers direct execution over long planning
- User asked for terse communication at times; match tone when requested
- Real-time typing experience is core product value now
- If UI starts feeling heavy, simplify before adding more controls
