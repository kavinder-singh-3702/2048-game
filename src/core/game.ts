import { DEFAULT_BOARD_SIZE } from './constants';
import { moveBoard, seedBoard } from './board';
import type { Board, Direction, GameStatus, MoveSummary } from './types';

export interface GameState {
  board: Board;
  score: number;
  status: GameStatus;
  size: number;
}

type GameAction =
  | { type: 'move'; direction: Direction }
  | { type: 'restart' }
  | { type: 'resize'; size: number };

export const createInitialGameState = (size: number = DEFAULT_BOARD_SIZE): GameState => ({
  board: seedBoard(size),
  score: 0,
  status: 'playing',
  size,
});

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'move': {
      if (state.status !== 'playing') {
        return state;
      }

      const { board, moved, scoreGained, status }: MoveSummary = moveBoard(
        state.board,
        action.direction,
      );

      if (!moved) {
        return state;
      }

      return {
        ...state,
        board,
        score: state.score + scoreGained,
        status,
      };
    }
    case 'restart':
      return {
        ...state,
        board: seedBoard(state.size),
        score: 0,
        status: 'playing',
      };
    case 'resize':
      if (action.size === state.size) {
        return state;
      }
      return {
        board: seedBoard(action.size),
        score: 0,
        status: 'playing',
        size: action.size,
      };
    default:
      return state;
  }
};
