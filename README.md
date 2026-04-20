# capitalize

A fast, one-page Astro app for fixing title capitalization as you type. Pick a mode, choose a title-case style guide, and watch same input update live in place so you can copy finished result immediately.

![Astro](https://img.shields.io/badge/Astro%206-FF5D01?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Why capitalize?

Most capitalization tools make you paste text into one field, click button, then copy result from somewhere else. That breaks flow. capitalize keeps whole job in one input. Type headline, switch modes, apply APA or AP rules, copy result, move on.

Logic also lives in one place, so UI and transform rules stay in sync instead of drifting across separate components.

## Features

### Live Editing

- **Single live input** — type directly into field that gets transformed in real time
- **Caret preservation** — selection and cursor stay stable while input value updates itself
- **One-click copy** — copy latest result without leaving keyboard flow
- **Mobile-friendly layout** — controls stack cleanly on smaller screens

### Capitalization Modes

- **Title Case** — guide-aware title capitalization
- **Sentence case** — capitalize opening sentence and normalize rest
- **UPPERCASE** — convert all letters to uppercase
- **lowercase** — convert all letters to lowercase
- **First Letter Case** — capitalize each word
- **HeLlO wOrLd** — alternating case for playful output

### Style-Guide Rules

- **APA**
- **MLA**
- **Chicago**
- **AP**
- **AMA**
- **Priority terms** — preserves branded and canonical casing like `ChatGPT`, `GitHub`, `iPhone`, `OpenAI`, and `Next.js`
- **Custom preserved terms** — transform functions support caller-provided terms for project-specific casing
- **Phrasal verb handling** — title case rules account for verb particles like `Log In` and `Sign Up`

## Requirements

- **Node.js 20+**
- **pnpm**

## Installation

```bash
git clone https://github.com/colinvkim/capitalize.git
cd capitalize
pnpm install
```

## Development

Start dev server:

```bash
pnpm dev
```

Build production bundle:

```bash
pnpm build
```

Run type + Astro checks:

```bash
pnpm check
```

Run tests:

```bash
pnpm test
```

Preview production build locally:

```bash
pnpm preview
```

## Project Structure

```
capitalize/
├── src/
│   ├── components/
│   │   └── CapitalizerApp.astro     # Main UI and browser event wiring
│   ├── layouts/
│   │   └── BaseLayout.astro         # Document shell, metadata, font import
│   ├── lib/
│   │   ├── capitalize.ts            # Modes, style guides, transform logic
│   │   ├── capitalize.test.ts       # Unit tests for capitalization behavior
│   │   └── priority-terms.json      # Canonical branded and acronym casing
│   ├── pages/
│   │   └── index.astro              # One-page app entry
│   └── styles/
│       └── global.css               # Global visual system and layout
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Architecture Notes

- **Browser-only app** — no backend, no API layer, no server-side persistence
- **Shared option metadata** in `src/lib/capitalize.ts` drives both UI controls and valid mode/guide values
- **Transform logic stays centralized** in `src/lib/capitalize.ts` so behavior changes do not get scattered through Astro component code
- **Client script handles live mutation** of same input field, copy feedback, and radio-driven rerenders
- **Vitest coverage** checks guide-specific title casing, branded terms, custom preserved terms, punctuation behavior, and alternate modes

## Contributing

Keep changes small and focused.

- Put capitalization behavior in `src/lib/capitalize.ts`
- Reuse shared mode and style-guide option arrays so UI stays in sync
- Preserve caret and selection behavior when touching live input updates
- Run `pnpm check` and `pnpm test` before opening PR

## License

MIT. See [LICENSE](LICENSE) for details.
