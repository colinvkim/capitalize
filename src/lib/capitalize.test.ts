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

  it("forces canonical priority-word casing in title case", () => {
    expect(
      transformTitle("chatgpt guide for iphone and gITHUB", "title-case", "apa")
    ).toBe("ChatGPT Guide for iPhone and GitHub");
  });

  it("preserves many branded and acronym terms in title case", () => {
    expect(
      transformTitle(
        "openai guide to github graphql javascript typescript and youtube",
        "title-case",
        "apa"
      )
    ).toBe("OpenAI Guide to GitHub GraphQL JavaScript TypeScript and YouTube");
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

  it("keeps numeric possessives lowercase in title case", () => {
    expect(
      transformTitle("jbl flip 5's effect on the us economy", "title-case", "apa")
    ).toBe("JBL Flip 5's Effect on the US Economy");
  });

  it("does not preserve all-caps small words in title case", () => {
    expect(
      transformTitle("tHE jOe biden IN THE house", "title-case", "apa")
    ).toBe("The Joe Biden in the House");
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

  it("forces canonical priority-word casing in sentence case", () => {
    expect(
      transformTitle("cHATgpt tips for iPHONE and gItHuB", "sentence-case", "mla")
    ).toBe("ChatGPT tips for iPhone and GitHub");
  });

  it("preserves custom capitalization in sentence case", () => {
    expect(
      transformTitle("mac tips from nasa and mcdonald's", "sentence-case", "mla")
    ).toBe("Mac tips from NASA and McDonald's");
  });

  it("infers mc surnames and normalizes non-priority mixed-case words", () => {
    expect(transformTitle("mcdonald met TISsue and DiMarillo", "sentence-case", "mla")).toBe(
      "McDonald met tissue and dimarillo"
    );
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

  it("keeps small words lowercase inside hyphenated title-case compounds", () => {
    expect(
      transformTitle("state-of-the-art tools for up-to-date teams", "title-case", "apa")
    ).toBe("State-of-the-Art Tools for Up-to-Date Teams");
  });

  it("capitalizes only first hyphen segment in sentence case", () => {
    expect(transformTitle("SELF-DRIVING CARS ARE HERE", "sentence-case", "ap")).toBe(
      "Self-driving cars are here"
    );
  });

  it("supports accented letters in capitalization transforms", () => {
    expect(transformTitle("élan vital for naïve users", "title-case", "apa")).toBe(
      "Élan Vital for Naïve Users"
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

  it("forces canonical priority-word casing in first letter case", () => {
    expect(
      transformTitle("cHATgpt tool for iPHONE and tISsue", "first-letter-case", "ap")
    ).toBe("ChatGPT Tool For iPhone And Tissue");
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

  it("creates alternating case", () => {
    expect(transformTitle("hello world", "alternating-case", "apa")).toBe(
      "HeLlO wOrLd"
    );
  });

  it("returns an empty string for blank input", () => {
    expect(transformTitle("   ", "title-case", "apa")).toBe("");
  });
});
