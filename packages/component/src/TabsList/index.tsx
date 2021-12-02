import React from 'react';
import { Tabs } from 'antd';
import { TabsProps, TabPaneProps } from 'antd/es/tabs';

const { TabPane } = Tabs;

// 按钮列表

export interface ITabsListItemProps extends TabPaneProps {
  visible?: boolean;
  onVisible?: (obj: ITabsListItemProps) => boolean;
  render?: (...args: any[]) => any;
  children?: React.ReactNode;
}

export interface ITabsListProps extends TabsProps {
  meta: ITabsListItemProps[];
}

const TabsList = (props: ITabsListProps) => {
  const { meta = [], ...rest } = props;
  return (
    <Tabs {...rest}>
      {meta
        .filter((item) => {
          if (Object.prototype.hasOwnProperty.call(item, 'visible')) {
            return item.visible;
          }
          if (typeof item.onVisible === 'function') {
            return item.onVisible(item);
          }
          return true;
        })
        .map((item) => {
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { visible, onVisible, render, children, ...tabPaneRest } = item;
          return <TabPane {...tabPaneRest}>{children || (typeof render === 'function' ? render() : <></>)}</TabPane>;
        })}
    </Tabs>
  );
};

export { TabsList };
