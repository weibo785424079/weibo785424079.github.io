import { act, renderHook } from '@testing-library/react-hooks'
import useEditor from "..";

describe('useEditor', () => {
    it('should be defined', () => {
        expect(useEditor).toBeDefined();
    })
})