import { useEffect, useState } from 'react';
import useWatch from '../useWatch';

export const useDocumentVisibility = () => {
  const [visible, setVisible] = useState(document.visibilityState);
  useEffect(() => {
    const listner = () => {
      setVisible(document.visibilityState);
    };
    document.addEventListener('visibilitychange', listner);
    return () => document.removeEventListener('visibilitychange', listner);
  }, []);

  return visible;
};

export const useDocumentShow = (cb: (...arrgs: any[]) => any, immediate = false) => {
  const visible = useDocumentVisibility();
  useWatch(visible, () => {
    if (visible === 'visible') {
      cb();
    }
  },
  {
    immediate,
  });
};
