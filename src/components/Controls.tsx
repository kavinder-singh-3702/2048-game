import type { FC } from 'react';
import type { Direction } from '../core/types';

interface ControlsProps {
  onMove: (direction: Direction) => void;
  disabled?: boolean;
}

const BUTTONS: Array<{ direction: Direction; label: string; ariaLabel: string }> = [
  { direction: 'up', label: 'Up', ariaLabel: 'Move up' },
  { direction: 'left', label: 'Left', ariaLabel: 'Move left' },
  { direction: 'right', label: 'Right', ariaLabel: 'Move right' },
  { direction: 'down', label: 'Down', ariaLabel: 'Move down' },
];

export const Controls: FC<ControlsProps> = ({ onMove, disabled = false }) => (
  <div className="controls" role="group" aria-label="Move controls">
    <div className="controls__grid">
      {BUTTONS.map(({ direction, label, ariaLabel }) => (
        <button
          key={direction}
          type="button"
          className={`controls__button controls__button--${direction}`}
          onClick={() => onMove(direction)}
          disabled={disabled}
          aria-label={ariaLabel}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);
