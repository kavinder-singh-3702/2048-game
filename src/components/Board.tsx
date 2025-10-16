import type { FC } from 'react';
import type { Board as BoardState, GameStatus } from '../core/types';
import { Tile } from './Tile';

interface BoardProps {
  board: BoardState;
  status: GameStatus;
}

export const Board: FC<BoardProps> = ({ board, status }) => (
  <div
    className={`board board--${status}`}
    style={{ gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))` }}
    role="grid"
    aria-label="2048 board"
  >
    {board.map((row, rowIndex) =>
      row.map((value, columnIndex) => (
        <Tile key={`${rowIndex}-${columnIndex}`} value={value} />
      )),
    )}
  </div>
);
