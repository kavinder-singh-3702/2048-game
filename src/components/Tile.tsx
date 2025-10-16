import type { FC } from 'react';

interface TileProps {
  value: number;
}

export const Tile: FC<TileProps> = ({ value }) => (
  <div className="tile" data-value={value === 0 ? 'empty' : value}>
    {value !== 0 ? value : ''}
  </div>
);
