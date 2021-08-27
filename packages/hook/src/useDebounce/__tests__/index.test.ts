import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks/native';
import { useDebounce } from '../index';

export const sleep = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
  
let hook: RenderHookResult<number,any>

describe('useDebounce', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });
  it('should work', async () => {
    let state = 1;
    act(() => {
      hook = renderHook(() => useDebounce(state, 1000))
    })
    await act(async() => {
      expect(hook.result.current).toEqual(1)
      state = 2;
      hook.rerender();
      expect(hook.result.current).toEqual(1)
      await sleep(1050)
      hook.rerender();
      expect(hook.result.current).toEqual(2)
    })
  })
});
