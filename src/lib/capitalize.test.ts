import { describe, expect, it } from "vitest";
import { transformTitle } from "./capitalize";

describe("transformTitle", () => {
  it("applies title case with guide-aware small words", () => {
    expect(
      transformTitle("a tale of two cities in the age of ai", "title-case", "apa")
    ).toBe("A Tale of Two Cities in the Age of AI");
  });

  it("preserves custom capitalization in title case", () => {
    expect(
      transformTitle("ai tools for iphone and ipad at mcdonald's", "title-case", "apa")
    ).toBe("AI Tools for iPhone and iPad at McDonald's");
  });

  it("preserves many branded and acronym terms in title case", () => {
    expect(
      transformTitle(
        "openai guide to github graphql javascript typescript nextjs nodejs vscode and youtube",
        "title-case",
        "apa"
      )
    ).toBe(
      "OpenAI Guide to GitHub GraphQL JavaScript TypeScript Next.js Node.js VSCode and YouTube"
    );
  });

  it("supports custom preserved terms in title case", () => {
    expect(
      transformTitle("notes about openclaw and dimarillo", "title-case", "apa", [
        "OpenClaw",
        "DiMarillo"
      ])
    ).toBe("Notes About OpenClaw and DiMarillo");
  });

  it("supports ama title casing", () => {
    expect(
      transformTitle("finding care for children with asthma", "title-case", "ama")
    ).toBe("Finding Care for Children With Asthma");
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

  it("preserves common acronyms in sentence case", () => {
    expect(transformTitle("NASA launched a new AI tool", "sentence-case", "mla")).toBe(
      "NASA launched a new AI tool"
    );
  });

  it("preserves mixed-case and uppercase branded terms in sentence case", () => {
    expect(
      transformTitle("iPhone tips for COVID-19 tracking", "sentence-case", "mla")
    ).toBe("iPhone tips for COVID-19 tracking");
  });

  it("preserves custom capitalization in sentence case", () => {
    expect(
      transformTitle("mac tips from nasa and mcdonald's", "sentence-case", "mla")
    ).toBe("Mac tips from NASA and McDonald's");
  });

  it("infers mc surnames and preserves typed mixed-case names", () => {
    expect(
      transformTitle("mcdonald met dimarillo and DiMarillo", "sentence-case", "mla")
    ).toBe("McDonald met dimarillo and DiMarillo");
  });

  it("supports custom preserved terms in sentence case", () => {
    expect(
      transformTitle("openclaw shipped with dimarillo", "sentence-case", "mla", [
        "OpenClaw",
        "DiMarillo"
      ])
    ).toBe("OpenClaw shipped with DiMarillo");
  });

  it("capitalizes phrasal verb particles in chicago title case", () => {
    expect(transformTitle("how to log in and sign up", "title-case", "chicago")).toBe(
      "How to Log In and Sign Up"
    );
  });

  it("capitalizes long prepositions in AP title case", () => {
    expect(transformTitle("a walk through history", "title-case", "ap")).toBe(
      "A Walk Through History"
    );
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

  it("preserves custom capitalization in first letter case", () => {
    expect(
      transformTitle("ai tools for iphone ipad mac and nasa", "first-letter-case", "ap")
    ).toBe("AI Tools For iPhone iPad Mac And NASA");
  });

  it("preserves many branded terms in first letter case", () => {
    expect(
      transformTitle(
        "openai github graphql javascript typescript macos ios ebay paypal wordpress whatsapp",
        "first-letter-case",
        "ap"
      )
    ).toBe(
      "OpenAI GitHub GraphQL JavaScript TypeScript macOS iOS eBay PayPal WordPress WhatsApp"
    );
  });

  it("supports custom preserved terms in first letter case", () => {
    expect(
      transformTitle("openclaw dimarillo mcdonald", "first-letter-case", "ap", [
        "OpenClaw",
        "DiMarillo"
      ])
    ).toBe("OpenClaw DiMarillo McDonald");
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
