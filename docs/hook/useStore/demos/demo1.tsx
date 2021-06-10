import React from 'react';
import { createAction, handleActions } from 'redux-actions';
import { createUseStore } from '@tms/site-hook';
import Button from 'antd/es/button';

const initState = {
  ID: '-',
};

const setIdAction = createAction('设置ID');

const setId = ({ dispatch }) => (ID: string) => dispatch(setIdAction({ ID }));

const reducer = handleActions({
  [setIdAction.toString()]:
    (state, action) => ({
      ...state,
      ...action.payload,
    }),
}, initState);

const {
  useContextState,
  useActions,
  withProvider,
} = createUseStore(reducer, initState);

const Parent = withProvider(({ children }: {children: React.ReactChild}) => children);

const Child = () => {
  const fns = useActions({ setId });
  const [state] = useContextState();
  return (
    <div>
      <div>{`ID: ${state.ID}`}</div>
      <Button onClick={() => fns.setId(String(Math.random()))}>设置ID</Button>
    </div>
  );
};

export default () => (
  <Parent>
    <Child />
  </Parent>
);
