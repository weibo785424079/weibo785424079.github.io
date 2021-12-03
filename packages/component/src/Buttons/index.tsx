/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

// 按钮列表

export interface IButtonsItem extends ButtonProps {
  text: string | ReactElement | React.ReactNode;
  key?: string;
  onClick?: (...args: any[]) => void;
  visible?: boolean;
  onVisible?: (obj: IButtonsItem) => boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  render?: (buttonsItem: IButtonsItem) => any;
}

export interface IButtonsProps {
  className?: string;
  meta: IButtonsItem[];
  style?: React.CSSProperties;
  metaItem?: {
    style?: React.CSSProperties;
    [key: string]: any;
  };
}

const hasOwnProperty = (obj: Record<string, any>, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const Buttons = (props: IButtonsProps) => {
  const { meta, className, metaItem } = props;

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <div className={`${className}`} style={props.style || {}}>
      {meta
        .filter((item) => {
          if (hasOwnProperty(item, 'visible')) {
            return item.visible;
          }
          if (typeof item.onVisible === 'function') {
            return item.onVisible(item);
          }
          return true;
        })
        .map((item, index) => {
          const { text, onClick, render, visible, onVisible, disabled = false, style, ...rest } = item;
          const { style: metaItemStyle, ...metaItemRest } = metaItem || {};
          const buttonProps = {
            disabled,
            style: {
              marginRight: 5,
              marginLeft: 5,
              ...(metaItemStyle || {}),
              ...(style || {})
            },
            ...metaItemRest,
            ...rest,
            onClick: () => {
              if (disabled) {
                return;
              }
              onClick?.();
            }
          };
          const children = (
            <React.Fragment key={item.key || index}>
              <Button {...buttonProps}>{text}</Button>
            </React.Fragment>
          );

          if (typeof render === 'function') {
            // @ts-ignore
            return <React.Fragment key={item.key || index}>{render(buttonProps)}</React.Fragment>;
          }
          return children;
        })}
    </div>
  );
};

Buttons.defaultProps = {
  className: '',
  style: {}
};

export { Buttons };
