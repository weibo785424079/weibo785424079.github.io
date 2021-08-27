import {renderHook} from '@testing-library/react-hooks'
import useMount from '..'

describe('useMount', () => {
    it('should be defined', () => {
        expect(useMount).toBeDefined()
    })
    it('should work', () => {
        const fn = jest.fn()
        renderHook(() => useMount(fn))
        expect(fn).toBeCalled()
    })
})