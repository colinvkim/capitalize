export type CapitalizationMode =
  | "title-case"
  | "sentence-case"
  | "uppercase"
  | "lowercase"
  | "first-letter-case"
  | "alternating-case";

export type StyleGuide = "apa" | "mla" | "chicago" | "ap" | "ama";

export interface Option<T extends string> {
  value: T;
  label: string;
  description: string;
}

export const DEFAULT_CAPITALIZATION_MODE: CapitalizationMode = "title-case";
export const DEFAULT_STYLE_GUIDE: StyleGuide = "apa";

export const CAPITALIZATION_MODE_OPTIONS: Option<CapitalizationMode>[] = [
  {
    value: "title-case",
    label: "Title Case",
    description: "Capitalize major words using the selected style guide."
  },
  {
    value: "sentence-case",
    label: "Sentence case",
    description: "Capitalize the opening sentence and lowercase the rest."
  },
  {
    value: "uppercase",
    label: "UPPERCASE",
    description: "Convert every letter to uppercase."
  },
  {
    value: "lowercase",
    label: "lowercase",
    description: "Convert every letter to lowercase."
  },
  {
    value: "first-letter-case",
    label: "First Letter Case",
    description: "Capitalize the first letter of each word."
  },
  {
    value: "alternating-case",
    label: "HeLlO wOrLd",
    description: "Alternate letter casing for a playful effect."
  }
];

export const STYLE_GUIDE_OPTIONS: Option<StyleGuide>[] = [
  {
    value: "apa",
    label: "APA",
    description: "Practical academic title casing with common small-word rules."
  },
  {
    value: "mla",
    label: "MLA",
    description: "Literary-leaning title casing with common preposition handling."
  },
  {
    value: "chicago",
    label: "Chicago",
    description: "General-purpose editorial title capitalization."
  },
  {
    value: "ap",
    label: "AP",
    description: "Newsroom-style capitalization with concise word treatment."
  },
  {
    value: "ama",
    label: "AMA",
    description: "Medical-journal-style capitalization with short connector words kept lowercase."
  }
];

const CAPITALIZATION_MODE_VALUES = new Set(
  CAPITALIZATION_MODE_OPTIONS.map((option) => option.value)
);
const STYLE_GUIDE_VALUES = new Set(STYLE_GUIDE_OPTIONS.map((option) => option.value));

const SMALL_WORDS: Record<StyleGuide, Set<string>> = {
  apa: new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "if",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "per",
    "so",
    "the",
    "to",
    "up",
    "via",
    "vs"
  ]),
  mla: new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "from",
    "if",
    "in",
    "into",
    "nor",
    "of",
    "on",
    "or",
    "over",
    "per",
    "so",
    "the",
    "to",
    "under",
    "up",
    "with"
  ]),
  chicago: new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "if",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "per",
    "the",
    "to",
    "up",
    "via",
    "vs"
  ]),
  ap: new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "nor",
    "of",
    "off",
    "on",
    "or",
    "out",
    "per",
    "the",
    "to",
    "up",
    "vs"
  ]),
  ama: new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "if",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "per",
    "the",
    "to",
    "up",
    "via",
    "vs",
    "yet"
  ])
};

const WORD_TOKEN_RE = /^([^A-Za-z0-9]*)([A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*(?:-[A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*)*)([^A-Za-z0-9]*)$/u;

export function transformTitle(
  input: string,
  mode: CapitalizationMode,
  guide: StyleGuide
): string {
  if (!input.trim()) {
    return "";
  }

  switch (mode) {
    case "title-case":
      return applyTitleCase(input, guide);
    case "sentence-case":
      return applySentenceCase(input);
    case "uppercase":
      return input.toUpperCase();
    case "lowercase":
      return input.toLowerCase();
    case "first-letter-case":
      return applyFirstLetterCase(input);
    case "alternating-case":
      return applyAlternatingCase(input);
    default:
      return input;
  }
}

export function isCapitalizationMode(value: string): value is CapitalizationMode {
  return CAPITALIZATION_MODE_VALUES.has(value as CapitalizationMode);
}

export function isStyleGuide(value: string): value is StyleGuide {
  return STYLE_GUIDE_VALUES.has(value as StyleGuide);
}

function applyTitleCase(input: string, guide: StyleGuide): string {
  const tokens = input.match(/\s+|[^\s]+/g) ?? [];
  const wordIndexes = tokens.flatMap((token, index) => (getWordCore(token) ? [index] : []));
  const lastWordIndex = wordIndexes.at(-1);
  let previousEndedClause = true;

  return tokens
    .map((token, index) => {
      const match = token.match(WORD_TOKEN_RE);

      if (!match) {
        if (token.trim()) {
          previousEndedClause = /[:.!?]$/.test(token.trim());
        }
        return token;
      }

      const prefix = match[1] ?? "";
      const core = match[2];
      const suffix = match[3] ?? "";

      if (!core) {
        return token;
      }

      const lowercaseCore = core.toLowerCase();
      const shouldForceCapitalize =
        index === wordIndexes[0] || index === lastWordIndex || previousEndedClause;

      previousEndedClause = /[:.!?]$/.test(`${core}${suffix}`.trim());

      if (!shouldForceCapitalize && SMALL_WORDS[guide].has(lowercaseCore)) {
        return `${prefix}${lowercaseCore}${suffix}`;
      }

      return `${prefix}${capitalizeCompound(core)}${suffix}`;
    })
    .join("");
}

function applySentenceCase(input: string): string {
  const lowered = input.toLowerCase();
  let shouldCapitalize = true;

  return Array.from(lowered)
    .map((character) => {
      if (isLetter(character) && shouldCapitalize) {
        shouldCapitalize = false;
        return character.toUpperCase();
      }

      if (/[.!?]/.test(character)) {
        shouldCapitalize = true;
      } else if (!/\s/.test(character) && isLetter(character)) {
        shouldCapitalize = false;
      }

      return character;
    })
    .join("");
}

function applyFirstLetterCase(input: string): string {
  return input.replace(/[A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*/gu, (word) =>
    capitalizeWord(word)
  );
}

function applyAlternatingCase(input: string): string {
  let uppercase = true;

  return Array.from(input.toLowerCase())
    .map((character) => {
      if (!isLetter(character)) {
        return character;
      }

      const nextCharacter = uppercase ? character.toUpperCase() : character;
      uppercase = !uppercase;
      return nextCharacter;
    })
    .join("");
}

function capitalizeCompound(input: string): string {
  return input
    .split(/(-)/)
    .map((part) => (part === "-" ? part : preserveAcronym(part) ?? capitalizeWord(part)))
    .join("");
}

function capitalizeWord(word: string): string {
  const lowercased = word.toLowerCase();
  const index = Array.from(lowercased).findIndex((character) => isLetter(character));

  if (index === -1) {
    return word.toUpperCase();
  }

  const characters = Array.from(lowercased);
  const target = characters[index];

  if (!target) {
    return lowercased;
  }

  characters[index] = target.toUpperCase();
  return characters.join("");
}

function preserveAcronym(word: string): string | null {
  if (/^[A-Z0-9]{2,5}$/u.test(word)) {
    return word;
  }

  return null;
}

function getWordCore(token: string): string | null {
  return token.match(WORD_TOKEN_RE)?.[2] ?? null;
}

function isLetter(character: string): boolean {
  return /\p{L}/u.test(character);
}
