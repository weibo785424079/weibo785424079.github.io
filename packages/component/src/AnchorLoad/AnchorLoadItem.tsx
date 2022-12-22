import React, { useEffect, forwardRef } from 'react';
import Empty from 'antd/es/empty';
import { AnchorLoadContext, AnchorLoadItemContext } from './Context';
import type { Types } from './Exector';
import AnchorLoadExector from './Exector';

interface AnchorLoadItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  visible: boolean;
  exector: AnchorLoadExector;
  type?: Types;
  minHeight?: number;
  renderTitle?: (title: string) => React.ReactNode;
}

type PartialAnchorLoadItemProps = Omit<AnchorLoadItemProps, 'visible' | 'exector'>;

export const AnchorLoadItem = forwardRef<HTMLDivElement, PartialAnchorLoadItemProps>(
  ({ id, title, children, exector, type = 'sync', visible, renderTitle, minHeight }: AnchorLoadItemProps, ref) => {
    useEffect(() => {
      exector.collect(type, id, type === 'sync');
      return () => exector.unCollect(type, id);
    }, [type, id, exector]);

    return (
      <AnchorLoadItemContext.Provider value={null}>
        <div ref={ref} className="site-load-content-item" id={id} style={{ minHeight }}>
          {renderTitle!(title)}
          {visible ? children : <Empty description="..." />}
        </div>
      </AnchorLoadItemContext.Provider>
    );
  }
);

AnchorLoadItem.defaultProps = {
  minHeight: 200,
  type: 'sync',
  renderTitle: (title) => <div className="title">{title}</div>
};

export const AnchorSyncLoadItem = (props: PartialAnchorLoadItemProps) => {
  return <AnchorLoadItem {...props} type="sync" />;
};

export const AnchorQueueLoadItem = (props: PartialAnchorLoadItemProps) => {
  return <AnchorLoadItem {...props} type="queue" />;
};

export const AnchorViewLoadItem = (props: PartialAnchorLoadItemProps) => {
  const { id } = props;
  const { load } = React.useContext(AnchorLoadContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        load(id);
      }
    });
    observer.observe(ref.current!);
  }, [ref]);

  return <AnchorLoadItem ref={ref} {...props} type="view" />;
};
