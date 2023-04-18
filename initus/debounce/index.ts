import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 2000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
}

export function useTrigger(action: any, delay = 2000) {
  const [actionTimeout, setActionTimeout] = useState<NodeJS.Timeout>();
  function sendSignal(data) {
    console.log("signaled!", data);
    clearTimeout(actionTimeout);
    const timeout = setTimeout(() => action(data), delay);
    setActionTimeout(timeout);
  }

  useEffect(() => {
    return () => {
      clearTimeout(actionTimeout);
    };
  }, []);

  return {
    sendSignal,
  };
}
