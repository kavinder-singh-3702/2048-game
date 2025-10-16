import type { FC } from 'react';
import type { GameStatus } from '../core/types';

interface ScorePanelProps {
  score: number;
  bestScore: number;
  status: GameStatus;
  onRestart: () => void;
}

export const ScorePanel: FC<ScorePanelProps> = ({
  score,
  bestScore,
  status,
  onRestart,
}) => (
  <section className="score-panel" aria-live="polite">
    <div className="score-panel__scores">
      <div className="score-card">
        <span className="score-card__label">Score</span>
        <span className="score-card__value">{score}</span>
      </div>
      <div className="score-card">
        <span className="score-card__label">Best</span>
        <span className="score-card__value">{bestScore}</span>
      </div>
    </div>
    <button type="button" className="score-panel__restart" onClick={onRestart}>
      Restart
    </button>
    {status === 'won' && <p className="score-panel__message">You reached 2048!</p>}
    {status === 'lost' && <p className="score-panel__message">No moves left. Try again.</p>}
  </section>
);
