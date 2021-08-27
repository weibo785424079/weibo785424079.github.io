import {renderHook} from '@testing-library/react-hooks'
import useRequest from '..'

function getData() {
    return Promise.resolve('data')
}
function getError() {
    return Promise.reject('error')
}

describe('useQueryString', () => {
    jest.useFakeTimers()
    it('should be defined', () => {
        expect(useRequest).toBeDefined()
    })
    it('should work', async () => {
        const hook = renderHook(() => useRequest(getData, {delay: 0}))
        expect(hook.result.current.loading).toBe(true)
        jest.runAllTimers()
        hook.rerender()
        await hook.waitForNextUpdate()
        expect(hook.result.current.result).toBe('data') 
    })
    it('should work withLoading', async () => {
        const hook = renderHook(() => useRequest(getData))
        expect(hook.result.current.loading).toBe(false)
        jest.advanceTimersByTime(1000)
        hook.rerender()
        expect(hook.result.current.loading).toBe(true)
    })
    it('should work withError', async () => {
        const hook = renderHook(() => useRequest(getError, {delay: 0}))
        expect(hook.result.current.loading).toBe(true)
        await hook.waitForNextUpdate()
        expect(hook.result.current.result).toBe(undefined) 
        expect(hook.result.current.error).toBe('error') 
    })
})