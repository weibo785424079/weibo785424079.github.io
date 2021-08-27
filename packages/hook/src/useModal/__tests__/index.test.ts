import { act, renderHook } from '@testing-library/react-hooks'
import useModal, { createUseComponent } from "..";

describe('useModal', () => {
    it('should be defined', () => {
        expect(useModal).toBeDefined();
    })
    const setup = () => renderHook(() => useModal())
    it('should work', () => {
        const hook = setup()
        expect(hook.result.current.visible).toBe(false)
        expect(hook.result.current.show).toBeDefined()
    })
    const useDemo = createUseComponent(() => null)();
    it('should work useCreateComponent', () => {
        const hook = renderHook(() => useDemo()) 
        expect(hook.result.current.visible).toBe(false)
        expect(hook.result.current.show).toBeDefined()
    })
})