import { useEffect } from 'react';
import type { Direction } from '../core/types';

const keyToDirection: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

export const useKeyboard = (onMove: (direction: Direction) => void, enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const direction = keyToDirection[key];

      if (!direction) {
        return;
      }

      event.preventDefault();
      onMove(direction);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, enabled]);
};
