/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { usePersistFn } from '@tms/site-hook';

const createBaseWidget =
  (onProps?: (obj: Record<string, any>) => any) =>
  (Component: any): any =>
    React.forwardRef((props: any, ref) => {
      const { element, children, ...rest } = props;
      const widgetsMapProps = typeof onProps === 'function' ? onProps({ element, ...rest }) || {} : {};

      const widgetsProps = {
        ...widgetsMapProps,
        ...rest
      };

      return (
        <Component ref={ref} {...widgetsProps}>
          {children}
        </Component>
      );
    });

export { createBaseWidget };
