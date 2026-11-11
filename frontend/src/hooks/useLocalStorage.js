import { useState, useEffect } from 'react';

/**
 * Custom hook to synchronize state with window.localStorage.
 * 
 * @param {string} key The localStorage key name
 * @param {any} initialValue Default value if key does not exist
 * @returns {[any, Function]} State value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Read initial state from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
