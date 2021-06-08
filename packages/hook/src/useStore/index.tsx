import React, {
  createContext, useContext, useReducer, useMemo, useRef, useCallback,
} from 'react';

function createUseStore<T>(reducer: (...args: any[]) => T, initState: T) {
  const StateContext = createContext([initState, () => initState] as [T, React.DispatchWithoutAction]);

  const useContextState = () => useContext(StateContext);

  const Provider = ({ children }: {children: React.ReactChild}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const value = useMemo(
      () => [state, dispatch],
      [state, dispatch],
    );
    return <StateContext.Provider value={value as any}>{children}</StateContext.Provider>;
  };

  const useActions = (actions: {[key:string]: (...args: any[]) => any}) => {
    const [state, dispatch] = useContextState();
    const fns = React.useRef(actions);
    const stateRef = useRef(state);
    stateRef.current = state;
    const getState = useCallback(() => stateRef.current, []);

    return useMemo(
      () => Object.keys(fns.current).reduce((prev, key) => {
        prev[key] = fns.current[key]({ dispatch, getState });

        return prev;
      }, {}),
      [dispatch, getState],
    );
  };

  function withProvider<S>(WrappedComponent: React.ComponentType<S>) {
    return (props: S) => (
      <Provider>
        <WrappedComponent {...props} />
      </Provider>
    );
  }

  return {
    useContextState, useActions, Provider, withProvider,
  };
}

export default createUseStore;
