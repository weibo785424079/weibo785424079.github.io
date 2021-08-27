import { act, renderHook } from '@testing-library/react-hooks'
import useCountDown from "..";

describe('useCountDown', () => {
    jest.useFakeTimers();
    it('should be defined', () => {
        expect(useCountDown).toBeDefined();
    })
    it('should work', () => {
        const { result, rerender } = renderHook(() => useCountDown(60))
        expect(result.current[0].isCountDowning).toBe(false)
        expect(result.current[0].remaning).toBe(60)
        act(() => {
            result.current[1].start()
        })
        expect(result.current[0].remaning).toBe(59)
        act(() => {
            jest.advanceTimersByTime(1000)
        })
        rerender()
        act(() => {
            jest.advanceTimersByTime(58000)
        })
        rerender()
        expect(result.current[0].remaning).toBe(0)
    })
    it('unmount should work', () => {
        const { result, unmount } = renderHook(() => useCountDown(60))
        act(() => {
            result.current[1].start()
        })
        expect(result.current[0].remaning).toBe(59)
        unmount()
    })
})