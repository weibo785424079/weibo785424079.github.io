import {renderHook} from '@testing-library/react-hooks'
import useUnMount from '..'

describe('useUnMount', () => {
    it('should be defined', () => {
        expect(useUnMount).toBeDefined()
    })
    it('should work', () => {
        const fn = jest.fn();
        const hook = renderHook(() => useUnMount(fn));
        expect(fn).toBeCalledTimes(0);
        hook.rerender();
        expect(fn).toBeCalledTimes(0);
        hook.unmount();
        expect(fn).toBeCalledTimes(1);
    });
})