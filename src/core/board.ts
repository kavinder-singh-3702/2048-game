import { GOAL_TILE, STARTING_TILES, TWO_TILE_PROBABILITY } from './constants';
import type { Board, Direction, GameStatus, MoveSummary } from './types';

type RandomFn = () => number;

export const createEmptyBoard = (size: number): Board =>
  Array.from({ length: size }, () => Array(size).fill(0));

export const seedBoard = (size: number, rng: RandomFn = Math.random): Board => {
  let board = createEmptyBoard(size);
  for (let index = 0; index < STARTING_TILES; index += 1) {
    board = addRandomTile(board, rng);
  }
  return board;
};

export const moveBoard = (
  board: Board,
  direction: Direction,
  rng: RandomFn = Math.random,
): MoveSummary => {
  const { board: slidedBoard, moved, scoreGained } = slide(board, direction);

  if (!moved) {
    return {
      board,
      moved: false,
      scoreGained: 0,
      status: deriveStatus(board),
    };
  }

  const withNewTile = addRandomTile(slidedBoard, rng);

  return {
    board: withNewTile,
    moved: true,
    scoreGained,
    status: deriveStatus(withNewTile),
  };
};

export const addRandomTile = (board: Board, rng: RandomFn = Math.random): Board => {
  const emptyCells = board.flatMap((row, rowIndex) =>
    row
      .map((value, columnIndex) => ({ value, rowIndex, columnIndex }))
      .filter((cell) => cell.value === 0),
  );

  if (emptyCells.length === 0) {
    return board;
  }

  const selectedCell = emptyCells[Math.floor(rng() * emptyCells.length)];
  const tileValue = rng() < TWO_TILE_PROBABILITY ? 2 : 4;

  return board.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      rowIndex === selectedCell.rowIndex && columnIndex === selectedCell.columnIndex
        ? tileValue
        : value,
    ),
  );
};

const slide = (board: Board, direction: Direction) => {
  switch (direction) {
    case 'left':
      return slideLeft(board);
    case 'right':
      return slideRight(board);
    case 'up':
      return slideUp(board);
    case 'down':
      return slideDown(board);
    default:
      return { board, moved: false, scoreGained: 0 };
  }
};

const slideLeft = (board: Board) => {
  let moved = false;
  let scoreGained = 0;

  const nextBoard = board.map((row) => {
    const { row: collapsed, moved: rowMoved, scoreFromRow } = collapseRow(row);
    if (rowMoved) {
      moved = true;
    }
    scoreGained += scoreFromRow;
    return collapsed;
  });

  return { board: nextBoard, moved, scoreGained };
};

const slideRight = (board: Board) => {
  const reversed = board.map((row) => [...row].reverse());
  const { board: slided, moved, scoreGained } = slideLeft(reversed);
  return { board: slided.map((row) => [...row].reverse()), moved, scoreGained };
};

const slideUp = (board: Board) => {
  const transposed = transpose(board);
  const { board: slided, moved, scoreGained } = slideLeft(transposed);
  return { board: transpose(slided), moved, scoreGained };
};

const slideDown = (board: Board) => {
  const transposed = transpose(board);
  const { board: slided, moved, scoreGained } = slideRight(transposed);
  return { board: transpose(slided), moved, scoreGained };
};

const collapseRow = (row: number[]) => {
  const filtered = row.filter((value) => value !== 0);
  const merged: number[] = [];
  let scoreFromRow = 0;

  for (let index = 0; index < filtered.length; index += 1) {
    const current = filtered[index];
    const next = filtered[index + 1];

    if (current !== undefined && current === next) {
      const mergedValue = current * 2;
      merged.push(mergedValue);
      scoreFromRow += mergedValue;
      index += 1;
    } else if (current !== undefined) {
      merged.push(current);
    }
  }

  while (merged.length < row.length) {
    merged.push(0);
  }

  const moved = merged.some((value, columnIndex) => value !== row[columnIndex]);
  return { row: merged, moved, scoreFromRow };
};

const transpose = (board: Board): Board =>
  board[0].map((_, columnIndex) => board.map((row) => row[columnIndex]));

const deriveStatus = (board: Board): GameStatus => {
  if (hasGoalTile(board)) {
    return 'won';
  }

  if (hasEmptyCell(board) || hasMergeableNeighbors(board)) {
    return 'playing';
  }

  return 'lost';
};

const hasEmptyCell = (board: Board) => board.some((row) => row.some((value) => value === 0));

const hasGoalTile = (board: Board) => board.some((row) => row.some((value) => value >= GOAL_TILE));

const hasMergeableNeighbors = (board: Board) => {
  const size = board.length;

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const value = board[row][column];
      if (value === 0) continue;

      if (
        (column + 1 < size && board[row][column + 1] === value) ||
        (row + 1 < size && board[row + 1][column] === value)
      ) {
        return true;
      }
    }
  }

  return false;
};
