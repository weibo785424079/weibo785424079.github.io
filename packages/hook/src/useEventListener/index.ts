import { useEffect, useRef } from 'react';
import { getTargetElement } from '../utils';

type Target = Element | (() => Element) | Window | Document
type Options<T extends Target = Target> = {
    target?: T;
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
};

function useEventListener(eventName: string, handler: Function, options: Options = {}) {
  const handlerRef = useRef<Function>();
  handlerRef.current = handler;

  useEffect(() => {
    const targetElement = getTargetElement(options.target, window)!;
    if (!targetElement.addEventListener) {
      return;
    }

    const eventListener = (
      event: Event,
    ): EventListenerOrEventListenerObject | AddEventListenerOptions => handlerRef.current && handlerRef.current(event); // eslint-disable-line

    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive,
    });

    return () => {
      targetElement.removeEventListener(eventName, eventListener, {
        capture: options.capture,
      });
    };
  }, [eventName, options.target, options.capture, options.once, options.passive]);
}
export default useEventListener;
