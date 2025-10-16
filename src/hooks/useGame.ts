import { useCallback, useEffect, useReducer } from 'react';
import { DEFAULT_BOARD_SIZE, GOAL_TILE } from '../core/constants';
import { createInitialGameState, gameReducer } from '../core/game';
import type { Direction } from '../core/types';
import { useLocalStorage } from './useLocalStorage';

const BEST_SCORE_KEY = '2048_best_score';

export const useGame = (size: number = DEFAULT_BOARD_SIZE) => {
  const [state, dispatch] = useReducer(gameReducer, size, createInitialGameState);
  const [bestScore, setBestScore] = useLocalStorage<number>(BEST_SCORE_KEY, 0);

  useEffect(() => {
    dispatch({ type: 'resize', size });
  }, [size]);

  useEffect(() => {
    if (state.score > bestScore) {
      setBestScore(state.score);
    }
  }, [state.score, bestScore, setBestScore]);

  const move = useCallback((direction: Direction) => {
    dispatch({ type: 'move', direction });
  }, [dispatch]);

  const restart = useCallback(() => {
    dispatch({ type: 'restart' });
  }, [dispatch]);

  return {
    board: state.board,
    score: state.score,
    bestScore,
    status: state.status,
    size: state.size,
    goal: GOAL_TILE,
    move,
    restart,
  };
};
