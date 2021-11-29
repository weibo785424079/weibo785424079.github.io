/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { ReactElement } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

// 按钮列表

export interface IButtonListItem extends ButtonProps {
  text: string | ReactElement | React.ReactNode;
  key?: string;
  onClick?: (...args: any[]) => void;
  visible?: boolean;
  onVisible?: (...args: any[]) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  render?: (children: ReactElement, item: IButtonListItem) => ReactElement;
}

export interface IButtonListProps {
  className?: string;
  meta: IButtonListItem[];
  style?: React.CSSProperties;
  metaItem?: {
    style?: React.CSSProperties;
    [key: string]: any;
  };
}

const hasOwnProperty = (obj: Record<string, any>, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

const ButtonList = (props: IButtonListProps) => {
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
          const children = (
            <Button
              disabled={disabled}
              key={item.key || index}
              style={{
                marginRight: 5,
                marginLeft: 5,
                ...(metaItemStyle || {}),
                ...(style || {})
              }}
              {...metaItemRest}
              {...rest}
              onClick={() => {
                if (disabled) {
                  return;
                }
                onClick?.();
              }}
            >
              {text}
            </Button>
          );

          if (typeof render === 'function') {
            return render(children, item);
          }
          return children;
        })}
    </div>
  );
};

ButtonList.defaultProps = {
  className: '',
  style: {}
};

export { ButtonList };
