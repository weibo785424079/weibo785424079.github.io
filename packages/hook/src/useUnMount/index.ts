import { useEffect, useRef } from 'react';

const useUnMount = <T extends (...args: any[]) => any>(fn: T) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => fnRef.current, []);
};

export default useUnMount;
