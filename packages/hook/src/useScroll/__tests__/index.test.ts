import {renderHook} from '@testing-library/react-hooks'
import useScroll  from '..'

describe('useScroll', () => {
    it('should be defined', () => {
        expect(useScroll).toBeDefined()
    })
    it('document body', () => {
        const {result: {current}} = renderHook(() => useScroll(document.body))
        expect(current.left).toBe(0);
        expect(current.top).toBe(0);
    });
})