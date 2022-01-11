import { useEffect, useState } from 'react';

type Fn = (...args: any[]) => any;

const noop = (_type?: string) => {}; // eslint-disable-line

export type BridgeItem<T = any> = {
  key: string;
  $save: (type?: string) => void;
  getSave(type?: string): Promise<T>;
  useHook: (fn: Fn) => void;
};

export type useBridgeProps<T = any> = { useHook: BridgeItem<T>['useHook'] };

export type TupleToObject<T extends readonly any[], P> = { [K in T[number]]: P };

function useBridge<T = any>(): BridgeItem<T>;
function useBridge<U extends readonly string[] = []>(args: U): TupleToObject<U, BridgeItem>;
function useBridge(args?: readonly string[]) {
  return useState(() => {
    const state = (args || ['$default$']).map((key) => {
      const curr = {
        key,
        $save: noop,
        getSave: (type?: string) => Promise.resolve(curr.$save(type)),
        useHook(fn: Fn) {
          useEffect(
            () => () => {
              curr.$save = noop;
            },
            []
          );
          curr.$save = fn;
        }
      };
      return curr;
    });
    return args
      ? state.reduce((prev, next) => {
          const curr = { ...prev };
          curr[next.key] = next;
          return curr;
        }, {})
      : state[0];
  })[0];
}

export default useBridge;
