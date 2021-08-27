import {renderHook} from '@testing-library/react-hooks'
import useUpdate from '..'


describe('useUpdate', () => {
    it('should be defined', () => {
        expect(useUpdate).toBeDefined()
    })
    let count = 0;
    const setUp = () => renderHook(() => {
        count++;
        return useUpdate()
    })
    it('should work', () => {
        const {rerender,unmount} = setUp() 
        expect(count).toBe(1)
        rerender()
        expect(count).toBe(2)
        rerender()
        expect(count).toBe(3)
        unmount()
        expect(count).toBe(3)
    });
})