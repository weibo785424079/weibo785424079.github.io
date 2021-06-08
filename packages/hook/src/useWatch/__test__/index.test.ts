import { renderHook, act } from '@testing-library/react-hooks/native';
import { useState } from 'react';
import useWatch from '../index';

const setUp = (fn) => renderHook(() => {
  const [state, setState] = useState(0)
  return [useWatch(state, fn), setState]
 });

describe('useWatch', () => {

  it('should be defined', () => {
    expect(useWatch).toBeDefined();
  });

  it('tset on wacher', async () => {
    const fn = jest.fn((v) => v)
    const { result } = setUp(fn)
    expect(fn).toBeCalledTimes(0)
    const setState = result.current[1];
    act(() => {
      setState(1)
    })
    act(() => {
      expect(fn).toBeCalledTimes(1)
      expect(fn.mock.results[0].value).toBe(0)
    })
  })
});
