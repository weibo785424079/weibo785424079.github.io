import {
  useEffect, useRef, useCallback, useState,
} from 'react';

const useDebounceFn = <T>(fn: (...args: any[]) => any, deps: T, ms = 300) => {
  const timer = useRef<number | null>();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      fn();
      timer.current = null;
    }, ms);
  }, [deps, ms]);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  return [cancel];
};

const useDebounce = <T>(value: T, t = 300) => {
  const [val, setVal] = useState<T>(value);

  useDebounceFn(() => {
    setVal(value);
  }, value, t);

  return val;
};

export { useDebounce, useDebounceFn };
