import { describe, expect, it } from "vitest";
import { transformTitle } from "./capitalize";

describe("transformTitle", () => {
  it("applies title case with guide-aware small words", () => {
    expect(
      transformTitle("a tale of two cities in the age of ai", "title-case", "apa")
    ).toBe("A Tale of Two Cities in the Age of Ai");
  });

  it("capitalizes after punctuation in title case", () => {
    expect(
      transformTitle("learning design: a guide for teams", "title-case", "chicago")
    ).toBe("Learning Design: A Guide for Teams");
  });

  it("applies sentence case across punctuation", () => {
    expect(
      transformTitle("THIS IS BIG. HERE IS ANOTHER LINE!", "sentence-case", "mla")
    ).toBe("This is big. Here is another line!");
  });

  it("uppercases the entire title", () => {
    expect(transformTitle("Hello, world 2026", "uppercase", "ap")).toBe(
      "HELLO, WORLD 2026"
    );
  });

  it("lowercases the entire title", () => {
    expect(transformTitle("Hello, WORLD 2026", "lowercase", "ap")).toBe(
      "hello, world 2026"
    );
  });

  it("capitalizes the first letter of each word", () => {
    expect(
      transformTitle("mixed-case input for every word", "first-letter-case", "ap")
    ).toBe("Mixed-Case Input For Every Word");
  });

  it("creates alternating case", () => {
    expect(transformTitle("hello world", "alternating-case", "apa")).toBe(
      "HeLlO wOrLd"
    );
  });

  it("returns an empty string for blank input", () => {
    expect(transformTitle("   ", "title-case", "apa")).toBe("");
  });
});
