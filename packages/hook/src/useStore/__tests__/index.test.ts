import { renderHook } from '@testing-library/react-hooks'
import useStore from "..";
import { createAction, handleActions } from 'redux-actions';
import  createUseStore from '..';

const initState = {
  ID: '-'
};

const setIdAction = createAction('设置ID');

const setId =
  ({ dispatch }) =>
  (ID: string) =>
    dispatch(setIdAction({ ID }));

const reducer = handleActions(
  {
    [setIdAction.toString()]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  initState
);

describe('useStore', () => {
    it('should be defined', () => {
        expect(useStore).toBeDefined();
    })
    it('should work', () => {
        const {result} = renderHook(() => createUseStore(reducer, initState))
        expect(result.current).toBeDefined()
    })
})