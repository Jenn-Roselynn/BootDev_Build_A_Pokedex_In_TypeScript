// repl.test.ts
// Unit tests for the REPL input cleaning function, ensuring robust handling of various user input formats.

import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "pidgey",
    expected: ["pidgey"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${JSON.stringify(expected)}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});