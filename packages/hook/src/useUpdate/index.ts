import { useState } from 'react';
import usePersistFn from '../usePersistFn';

const useUpdate = () => {
  const [, setState] = useState(false);
  return usePersistFn(() => {
    setState((c) => !c);
  });
};

export default useUpdate;
