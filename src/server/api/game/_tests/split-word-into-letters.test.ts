import { describe, expect, test } from "vitest";
import { splitWordIntoLetters } from "../game.helpers";

describe("test splitWordIntoLetters helper", () => {
  test("should split input into letters with valid status", () => {
    const input = "abcde";
    const value = splitWordIntoLetters({ input, expectedWord: "ajhed" });

    expect(value?.length).toBe(input.length);
    for (const [index, c] of input.split("").entries()) {
      expect(value?.[index]?.letter).toBe(c);
    }
    expect(value?.[0]?.status).toBe("correct");
    expect(value?.[1]?.status).toBe("invalid");
    expect(value?.[2]?.status).toBe("invalid");
    expect(value?.[3]?.status).toBe("valid");
    expect(value?.[4]?.status).toBe("valid");
  });

  test("should return null on invalid input", () => {
    const value = splitWordIntoLetters({ input: "", expectedWord: "ajhed" });
    expect(value).toBe(null);
  });
});
