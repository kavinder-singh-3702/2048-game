import type { FC } from 'react';
import { useState, useCallback } from 'react';
import { DEFAULT_BOARD_SIZE } from '../core/constants';
import type { Direction } from '../core/types';
import { useGame } from '../hooks/useGame';
import { useKeyboard } from '../hooks/useKeyboard';
import { Board } from './Board';
import { Controls } from './Controls';
import { ScorePanel } from './ScorePanel';
import { SizeSelector } from './SizeSelector';

export const Game: FC = () => {
  const [size, setSize] = useState(DEFAULT_BOARD_SIZE);
  const { board, score, bestScore, status, goal, move, restart } = useGame(size);

  useKeyboard(move, status === 'playing');

  const handleMove = useCallback(
    (direction: Direction) => {
      move(direction);
    },
    [move],
  );

  const handleSizeChange = useCallback(
    (nextSize: number) => {
      setSize(nextSize);
    },
    [setSize],
  );

  return (
    <div className="game">
      <header className="game__header">
        <div>
          <h1 className="game__title">2048</h1>
          <p className="game__subtitle">Combine tiles to reach {goal}.</p>
        </div>
        <SizeSelector size={size} onChange={handleSizeChange} disabled={status !== 'playing'} />
      </header>

      <ScorePanel score={score} bestScore={bestScore} status={status} onRestart={restart} />

      <div className="game__board-wrapper">
        <Board board={board} status={status} />
        {status !== 'playing' && (
          <div className="game__overlay" role="presentation">
            <p className="game__overlay-title">
              {status === 'won' ? 'You reached 2048!' : 'No moves left'}
            </p>
            <p className="game__overlay-subtitle">Press restart to try again.</p>
            <button type="button" className="game__overlay-button" onClick={restart}>
              Restart
            </button>
          </div>
        )}
      </div>

      <Controls onMove={handleMove} disabled={status !== 'playing'} />

      <p className="game__hint">Use arrow keys or WASD to move the tiles.</p>
    </div>
  );
};
