import type { Letter } from "~/types/game-state.type";
import { WORDS } from "./game.data";

export function splitWordIntoLetters({
  input,
  expectedWord,
}: {
  input: string;
  expectedWord: string;
}): Letter[] {
  if (input.length !== expectedWord.length) throw new Error("Invalid Word");

  const word: Letter[] = [];
  for (const [index, c] of input.split("").entries()) {
    if (c === expectedWord[index]) {
      word.push({ letter: c, status: "correct" });
    } else if (expectedWord.includes(c)) {
      word.push({ letter: c, status: "valid" });
    } else {
      word.push({ letter: c, status: "invalid" });
    }
  }
  return word;
}

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[randomIndex]!;
  console.log({ randomeWord: word });
  return word;
}
