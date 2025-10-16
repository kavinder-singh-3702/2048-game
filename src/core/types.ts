export type Board = number[][];

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'playing' | 'won' | 'lost';

export interface MoveSummary {
  board: Board;
  moved: boolean;
  scoreGained: number;
  status: GameStatus;
}

