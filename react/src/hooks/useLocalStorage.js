import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Lazy initializer: runs only ONCE upon mounting
  const [value, setValue] = useState(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn(`[useLocalStorage] Read error for "${key}":`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Write error for "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}