import {renderHook} from '@testing-library/react-hooks'
import {useDocumentShow, useDocumentVisibility} from '..'

describe('useDocumentVisibility', () => {
    it('should be defined', () => {
        expect(useDocumentShow).toBeDefined()
        expect(useDocumentVisibility).toBeDefined()
    })
    it('get visiblity', () => {
        const { result } = renderHook(() => useDocumentVisibility())
        expect(result.current).toBe('visible')
    })
    it('test useDocumentShow', () => {
        const fn = jest.fn()
        const {rerender} = renderHook(({immediate}) => useDocumentShow(fn, immediate), {
            initialProps: {
                immediate: false
            }
        })
        expect(fn).toBeCalledTimes(0)
        rerender({immediate: true}) // 实际上是useWatch实现的依赖刷新
        expect(fn).toBeCalledTimes(1)
    })
})
