import { act, renderHook } from '@testing-library/react-hooks'
import routeData from 'react-router';
import useUrlState from "..";

describe('useUrlState', () => {
    it('should be defined', () => {
        expect(useUrlState).toBeDefined();
    })
 
    describe('test url',() => {
        let hook;
        function setup(key: string, value: string) {
            hook = renderHook(() => {
              return useUrlState({ [key]: value });
            }) as any;
            hook.rerender();
          }
      
        const replaceFn = jest.fn()
        const mockLocation = {
            pathname: '/',
            hash: '',
            search: '',
            state: '',
          };
        const mockHistory = {
            push: ({search}) => {
                replaceFn()
                mockLocation.search = search;
            }
        }
        beforeEach(() => {
            jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
            jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory as any)
        })
        afterEach(() => {
            hook.unmount()
        })
        it('history replace should work', () => {
            act(() => {
                setup('mock', '0')
            })
            expect(replaceFn).toBeCalledTimes(0);
            expect(hook.result.current[0]).toEqual({ mock: '0' });
            expect(mockLocation.search).toEqual('');
            act(() => {
                hook.result.current[1]({ mock: 1 })
            })
            expect(replaceFn).toBeCalledTimes(1);
            expect(mockLocation.search).toEqual('mock=1');
            act(() => {
                hook.result.current[1]({ mock: 2, test: 3 });
            });
            expect(mockLocation.search).toEqual('mock=2&test=3');
        })
    })
})