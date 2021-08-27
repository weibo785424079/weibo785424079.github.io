import {renderHook} from '@testing-library/react-hooks'
import useEventListener from '..'

describe('useEventListenner', () => {
    it('should be defined', () => {
        expect(useEventListener).toBeDefined()
    })
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div')
        document.body.appendChild(container)
    })
    afterEach(() => {
        document.body.removeChild(container)
    })
    it('test on click', () => {
        let state = 0;
        const onClick = () => {
            state++;
        }

        const {rerender,unmount} = renderHook(() => useEventListener('click', onClick, {target: container}))
        document.body.click()
        expect(state).toBe(0);
        rerender();
        container.click()
        expect(state).toBe(1)
        unmount()
        document.body.click();
        expect(state).toEqual(1);
    })
})
