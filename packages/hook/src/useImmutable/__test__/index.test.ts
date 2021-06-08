import { renderHook, act } from '@testing-library/react-hooks/native';
import useImmutable from '../index';

const setUp = <T>(v: T) => renderHook(() => {
    return useImmutable(v)
 });

describe('useImmutable', () => {
  it('should be defined', () => {
    expect(useImmutable).toBeDefined();
  });

  it('tset on change', async () => {
    const obj = {}
    const { result } = setUp(obj)
    act(() => {
        expect(result.current).toBe(obj)
    })
  })
});
