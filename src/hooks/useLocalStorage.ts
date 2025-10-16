import { useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T,>(key: string, defaultValue: T) => {
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState<T>(readValue);

  useEffect(() => {
    setValue(readValue());
  }, [readValue]);

  const updateValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const resolvedValue = next instanceof Function ? next(previous) : next;

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
        }

        return resolvedValue;
      });
    },
    [key],
  );

  return [value, updateValue] as const;
};
