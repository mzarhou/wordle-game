import { redis } from "~/server/redis";
import type { FullGameState, GameState, Letter } from "~/types/game-state.type";

const getGameStateKey = (userId: string) => `game-state:${userId}`;

export async function getGameState(
  userId: string,
): Promise<FullGameState | null> {
  const value = await redis.get(getGameStateKey(userId));
  if (!value) return null;
  return JSON.parse(value) as FullGameState;
}

export async function setFullGameState(
  userId: string,
  state: FullGameState,
): Promise<void> {
  await redis.set(getGameStateKey(userId), JSON.stringify(state));
}

export async function setGameState(
  userId: string,
  state: Partial<GameState>,
): Promise<FullGameState> {
  const oldState = await getGameState(userId);
  if (!oldState) throw new Error("old game state not found");
  const newState: FullGameState = {
    word: oldState.word,
    state: {
      ...oldState.state,
      ...state,
    },
  };
  await redis.set(getGameStateKey(userId), JSON.stringify(newState));
  return newState;
}

export async function generateNewGame(
  userId: string,
  targetWord: string,
): Promise<FullGameState> {
  const fullGameState = {
    word: targetWord,
    state: {
      currentIndex: 0,
      words: [],
      end: false,
      won: false,
    } satisfies GameState,
  };
  await setFullGameState(userId, fullGameState);
  return fullGameState;
}

export async function addNewWord(
  userId: string,
  word: Letter[],
): Promise<FullGameState> {
  const gameState = await getGameState(userId);
  if (!gameState) throw new Error("Game not found");
  gameState.state.words.push(word);
  gameState.state.currentIndex++;
  await setFullGameState(userId, gameState);
  return gameState;
}

export async function deleteGame(userId: string) {
  await redis.del(getGameStateKey(userId));
}
