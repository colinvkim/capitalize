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

const ARTICLES = new Set(["a", "an", "the"]);
const COORDINATING_CONJUNCTIONS = new Set(["and", "but", "for", "nor", "or", "so", "yet"]);
const PREPOSITIONS = new Set([
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "among",
  "around",
  "as",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "by",
  "concerning",
  "despite",
  "down",
  "during",
  "except",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "like",
  "near",
  "of",
  "off",
  "on",
  "onto",
  "out",
  "outside",
  "over",
  "past",
  "per",
  "plus",
  "round",
  "since",
  "than",
  "through",
  "throughout",
  "till",
  "to",
  "toward",
  "towards",
  "under",
  "underneath",
  "until",
  "unto",
  "up",
  "upon",
  "via",
  "with",
  "within",
  "without",
  "vs",
  "v"
]);
const SHORT_CONJUNCTIONS = new Set(["as", "if", "than", "that", "when", "yet"]);
const GUIDE_PREPOSITION_LENGTH_LIMIT: Record<StyleGuide, number | null> = {
  apa: 3,
  mla: null,
  chicago: null,
  ap: 3,
  ama: 3
};
const PHRASAL_VERB_PARTICLES = new Map<string, Set<string>>([
  ["back", new Set(["down", "off", "out", "up"])],
  ["break", new Set(["down", "out", "up"])],
  ["bring", new Set(["back", "down", "in", "out", "up"])],
  ["build", new Set(["up", "out"])],
  ["carry", new Set(["on", "out", "over"])],
  ["check", new Set(["in", "off", "out", "up"])],
  ["clean", new Set(["out", "up"])],
  ["come", new Set(["back", "down", "in", "off", "out", "up"])],
  ["cut", new Set(["back", "down", "off", "out", "up"])],
  ["figure", new Set(["out"])],
  ["find", new Set(["out"])],
  ["get", new Set(["away", "back", "down", "in", "off", "out", "over", "through", "up"])],
  ["give", new Set(["away", "back", "in", "off", "out", "up"])],
  ["go", new Set(["back", "down", "in", "off", "on", "out", "over", "up"])],
  ["hold", new Set(["back", "off", "on", "out", "up"])],
  ["keep", new Set(["on", "out", "up"])],
  ["log", new Set(["in", "off", "on", "out"])],
  ["look", new Set(["after", "around", "back", "down", "for", "into", "out", "over", "up"])],
  ["make", new Set(["for", "out", "over", "up"])],
  ["pick", new Set(["out", "up"])],
  ["point", new Set(["out"])],
  ["scale", new Set(["back", "down", "up"])],
  ["set", new Set(["apart", "aside", "back", "off", "out", "up"])],
  ["shut", new Set(["down", "off", "out", "up"])],
  ["show", new Set(["off", "up"])],
  ["sign", new Set(["in", "off", "on", "out", "up"])],
  ["start", new Set(["off", "out", "up"])],
  ["take", new Set(["apart", "away", "back", "down", "in", "off", "out", "over", "up"])],
  ["turn", new Set(["away", "back", "down", "in", "off", "on", "out", "over", "up"])],
  ["wake", new Set(["up"])],
  ["work", new Set(["in", "off", "out", "over", "through", "up"])],
  ["write", new Set(["down", "off", "out", "up"])]
]);
const PRESERVED_TERMS = new Map<string, string>([
  ["ai", "AI"],
  ["ama", "AMA"],
  ["api", "API"],
  ["cpu", "CPU"],
  ["css", "CSS"],
  ["covid", "COVID"],
  ["dna", "DNA"],
  ["eu", "EU"],
  ["faq", "FAQ"],
  ["html", "HTML"],
  ["http", "HTTP"],
  ["https", "HTTPS"],
  ["ipad", "iPad"],
  ["iphone", "iPhone"],
  ["id", "ID"],
  ["ip", "IP"],
  ["js", "JS"],
  ["json", "JSON"],
  ["mac", "Mac"],
  ["mcdonald's", "McDonald's"],
  ["mcdonald’s", "McDonald's"],
  ["mla", "MLA"],
  ["nasa", "NASA"],
  ["pdf", "PDF"],
  ["rna", "RNA"],
  ["sql", "SQL"],
  ["tv", "TV"],
  ["ui", "UI"],
  ["uk", "UK"],
  ["url", "URL"],
  ["us", "US"],
  ["usa", "USA"],
  ["ux", "UX"]
]);

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
  let previousWordCore: string | null = null;

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
      const shouldLowercase =
        !shouldForceCapitalize &&
        shouldLowercaseInTitle(lowercaseCore, guide, previousWordCore);
      previousWordCore = lowercaseCore;

      if (shouldLowercase) {
        return `${prefix}${lowercaseCore}${suffix}`;
      }

      return `${prefix}${capitalizeCompound(core)}${suffix}`;
    })
    .join("");
}

function applySentenceCase(input: string): string {
  const tokens = input.match(/\s+|[^\s]+/g) ?? [];
  let shouldCapitalize = true;

  return tokens
    .map((token) => {
      const match = token.match(WORD_TOKEN_RE);

      if (!match) {
        if (token.trim() && /[.!?]["')\]]*$/.test(token.trim())) {
          shouldCapitalize = true;
        }
        return token;
      }

      const prefix = match[1] ?? "";
      const core = match[2];
      const suffix = match[3] ?? "";

      if (!core) {
        return token;
      }

      const normalizedCore = shouldCapitalize
        ? capitalizeSentenceWord(core)
        : normalizeSentenceWord(core);

      shouldCapitalize = false;
      if (/[.!?]["')\]]*$/.test(`${core}${suffix}`.trim())) {
        shouldCapitalize = true;
      }

      return `${prefix}${normalizedCore}${suffix}`;
    })
    .join("");
}

function applyFirstLetterCase(input: string): string {
  return input.replace(/[A-Za-z0-9]+(?:[’'][A-Za-z0-9]+)*/gu, (word) =>
    preserveTerm(word, true) ?? capitalizeWord(word)
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
    .map((part) => {
      if (part === "-") {
        return part;
      }

      return preserveExactCase(part) ?? preserveTerm(part, true) ?? capitalizeWord(part);
    })
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

function preserveTerm(word: string, allowGenericUppercase: boolean): string | null {
  const preservedTerm = PRESERVED_TERMS.get(normalizeLookupKey(word));

  if (preservedTerm) {
    return preservedTerm;
  }

  if (allowGenericUppercase && /^[A-Z0-9]{2,5}$/u.test(word)) {
    return word;
  }

  return null;
}

function getWordCore(token: string): string | null {
  return token.match(WORD_TOKEN_RE)?.[2] ?? null;
}

function shouldLowercaseInTitle(
  word: string,
  guide: StyleGuide,
  previousWordCore: string | null
): boolean {
  if (ARTICLES.has(word) || COORDINATING_CONJUNCTIONS.has(word)) {
    return true;
  }

  if (isPhrasalParticle(word, previousWordCore)) {
    return false;
  }

  if (!PREPOSITIONS.has(word) && !SHORT_CONJUNCTIONS.has(word)) {
    return false;
  }

  const lengthLimit = GUIDE_PREPOSITION_LENGTH_LIMIT[guide];
  if (lengthLimit === null) {
    return true;
  }

  return word.length <= lengthLimit;
}

function isPhrasalParticle(word: string, previousWordCore: string | null): boolean {
  if (!previousWordCore) {
    return false;
  }

  return PHRASAL_VERB_PARTICLES.get(previousWordCore)?.has(word) ?? false;
}

function normalizeSentenceWord(word: string): string {
  return normalizeCompoundWord(word, false, false);
}

function capitalizeSentenceWord(word: string): string {
  return normalizeCompoundWord(word, true, false);
}

function normalizeCompoundWord(
  word: string,
  capitalizeFirstWord: boolean,
  allowGenericUppercase: boolean
): string {
  return word
    .split(/(-)/)
    .map((part) => {
      if (part === "-") {
        return part;
      }

      const preserved = preserveExactCase(part) ?? preserveTerm(part, allowGenericUppercase);
      if (preserved) {
        return preserved;
      }

      return capitalizeFirstWord ? capitalizeWord(part) : part.toLowerCase();
    })
    .join("");
}

function preserveExactCase(word: string): string | null {
  const hasLowercase = /[a-z]/.test(word);
  const hasUppercase = /[A-Z]/.test(word);

  if (hasLowercase && hasUppercase) {
    return word;
  }

  return null;
}

function normalizeLookupKey(word: string): string {
  return word.toLowerCase().replaceAll("’", "'");
}

function isLetter(character: string): boolean {
  return /\p{L}/u.test(character);
}
