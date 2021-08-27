import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'
import useVirtualList from "..";

describe('useVirtualList', () => {
    it('should be defined', () => {
        expect(useVirtualList).toBeDefined();
    })
})