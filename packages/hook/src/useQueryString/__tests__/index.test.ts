import {renderHook} from '@testing-library/react-hooks'
import useQueryString from '..'

describe('useQueryString', () => {
    it('should be defined', () => {
        expect(useQueryString).toBeDefined()
    })
    it('get value', () => {
        const {rerender,result} = renderHook(({str}) => useQueryString(str), {
            initialProps: {str: ''}
        })
        expect(result.current).toEqual({})
        rerender({str: 'id=001'})
        expect(result.current).toEqual({id: '001'})
    })
})