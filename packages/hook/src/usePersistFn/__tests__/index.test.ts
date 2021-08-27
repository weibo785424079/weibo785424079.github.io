import {act, renderHook} from '@testing-library/react-hooks'
import usePersistFn  from '..'

describe('usePersistFn', () => {
    it('should be defined', () => {
        expect(usePersistFn).toBeDefined()
    })
    it('should equal', () => {
        const fn1 = jest.fn()
        const {result: {current}} = renderHook(() => usePersistFn(fn1))
        act(() => {
            current()
        })
        expect(fn1).toBeCalled()
    });
})