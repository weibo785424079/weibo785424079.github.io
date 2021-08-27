import {renderHook} from '@testing-library/react-hooks'
import useSize from '..'

describe('useSize', () => {
    it('should be defined', () => {
        expect(useSize).toBeDefined();
    })
    it('should work', () => {
        const hook = renderHook(() => useSize(document.body));
        expect(hook.result.current).toEqual([{height: 0, width: 0}])
    });
})