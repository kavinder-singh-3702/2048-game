import type { FC } from 'react';

interface SizeSelectorProps {
  size: number;
  onChange: (size: number) => void;
  options?: number[];
  disabled?: boolean;
}

const DEFAULT_OPTIONS = [3, 4, 5, 6];

export const SizeSelector: FC<SizeSelectorProps> = ({
  size,
  onChange,
  options = DEFAULT_OPTIONS,
  disabled = false,
}) => (
  <label className="size-selector">
    <span className="size-selector__label">Board Size</span>
    <select
      className="size-selector__select"
      value={size}
      onChange={(event) => onChange(Number(event.target.value))}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option} x {option}
        </option>
      ))}
    </select>
  </label>
);
