import {
  useCallback, useEffect, useReducer, useRef,
} from 'react';

interface Options {
    immediate: boolean;
    manul: boolean;
    delay: number;
    handelResult: (...args: any[]) => any;
}

export type PromiseType<T> = T extends Promise<infer P> ? P : T;

interface Result<R, T extends (...args: any[]) => any> {
    run: T;
    loading: boolean;
    error: Error | undefined;
    result: R;
}

const defaultHandeResult = <T>(d: T) => d;

function useRequest<R = any, T extends(...args: any[]) => any = (...args: any[]) => any>(fn: T, options: Partial<Options> = {}): Result<R, T> { // eslint-disable-line
  const optionRef = useRef(
    (() => {
      const {
        manul = false, immediate = true, delay = 1000, handelResult = defaultHandeResult,
      } = options;
      return {
        manul,
        delay: delay ?? 1000,
        immediate: manul ? false : immediate,
        handelResult,
      };
    })(),
  );

  const runRef = useRef<T>(fn);

  runRef.current = fn;

  const isCurrent = useCallback((cb: T) => runRef.current === cb, []);

  const timer = useRef<number | null>(null);

  const initValue = { loading: false, result: undefined, error: undefined };

  const [value, dispatch] = useReducer(
    (state: Result<R, T>, action) => ({ ...state, ...action }),
    initValue,
  );

  const openLoading = useCallback(() => {
    const { delay } = optionRef.current;

    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (delay) {
      timer.current = window.setTimeout(() => {
        dispatch({ loading: true });
      }, delay);
    } else {
      dispatch({ loading: true });
    }
  }, []);

  const closeLoading = useCallback((closeOptions = {}) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    dispatch({ loading: false, ...closeOptions });
  }, []);

  const run = useCallback(
    async (...args) => {
      try {
        openLoading();

        const result = await fn(...args);

        if (isCurrent(fn)) {
          closeLoading({
            loading: false,
            error: undefined,
            result: optionRef.current.handelResult(result),
          });
        }
      } catch (error) {
        if (isCurrent(fn)) {
          closeLoading({ loading: false, error, result: undefined });
        }
        console.log(error);
      }
    },
    [fn],
  );

  useEffect(() => {
    const { manul, immediate } = optionRef.current;
    if (!manul) {
      if (immediate) {
        run();
      } else {
        optionRef.current.immediate = true;
      }
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [run]);

  return { run, ...value };
}

export default useRequest;
