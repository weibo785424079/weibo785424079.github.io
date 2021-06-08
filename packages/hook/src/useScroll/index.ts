import { useState, useEffect } from 'react';
import usePersistFn from '../usePersistFn';
import { BasicTarget, getTargetElement } from '../utils';

interface Position {
    left: number;
    top: number;
}

export type Target = BasicTarget<HTMLElement | Document>;
export type ScrolllistenController = (val: Position) => boolean;

function uesScroll(target: Target, shouldUpdate: ScrolllistenController = () => true) {
  const [position, setPosition] = useState<Position>({
    left: NaN,
    top: NaN,
  });

  const shouldUpdatePersist = usePersistFn(shouldUpdate);

  useEffect(() => {
    const el = getTargetElement(target, document);
    if (!el) return;
    function updatePosition(currentTarget: Target): void {
      let newPosition;

      if (currentTarget === document) {
        if (!document.scrollingElement) return;
        newPosition = {
          left: document.scrollingElement.scrollLeft,
          top: document.scrollingElement.scrollTop,
        };
      } else {
        newPosition = {
          left: (currentTarget as HTMLElement).scrollLeft,
          top: (currentTarget as HTMLElement).scrollTop,
        };
      }
      if (shouldUpdatePersist(newPosition)) {
        setPosition(newPosition);
      }
    }
    updatePosition(el as Target);
    function listener(event: Event) {
      if (!event.target) return;
      updatePosition(event.target as Target);
    }
    el.addEventListener('scroll', listener);
    return () => {
      el.removeEventListener('scroll', listener);
    };
  }, [target, shouldUpdatePersist]);

  return position;
}

export default uesScroll;
