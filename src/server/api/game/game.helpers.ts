import type { Letter } from "~/types/game-state.type";
import { WORDS } from "./game.data";
import { WORD_LETTERS_COUNT } from "../../../config/game-config";

const replace = (word: string, index: number, c: string) => {
  const arr = word.split("");
  arr.splice(index, 1, c);
  return arr.join("");
};

export function splitWordIntoLetters(params: {
  input: string;
  expectedWord: string;
}): Letter[] {
  let input = params.input;
  let expectedWord = params.expectedWord;
  if (input.length !== expectedWord.length) throw new Error("Invalid Word");

  const letters: Letter[] = Array(WORD_LETTERS_COUNT)
    .fill(null)
    .map(() => ({
      letter: "-",
      status: "default",
    }));

  // remove matches
  for (let i = 0; i < WORD_LETTERS_COUNT; i++) {
    if (input[i] === expectedWord[i]) {
      letters[i] = {
        letter: input[i]!,
        status: "correct",
      };
      expectedWord = replace(expectedWord, i, "-");
      input = replace(input, i, "-");
    }
  }

  for (let i = 0; i < input.length; i++) {
    const c = input[i]!;
    if (c === "-") continue;
    const j = expectedWord.indexOf(c);
    if (j > -1) {
      letters[i] = {
        letter: input[i]!,
        status: "valid",
      };
      expectedWord = replace(expectedWord, j, "-");
    } else {
      letters[i] = {
        letter: input[i]!,
        status: "invalid",
      };
    }
  }

  return letters;
}

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const word = WORDS[randomIndex]!;
  console.log({ randomeWord: word });
  return word;
}
