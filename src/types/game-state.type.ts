export type Letter = {
  letter: string;

  /**
   * valid -> correct letter in the wrong position
   */
  status: "correct" | "valid" | "invalid" | "default";
};

export type GameState = {
  currentIndex: number;
  words: Letter[][];
  end: boolean;
  won: boolean;
};

export type FullGameState = {
  word: string;
  state: GameState;
};
